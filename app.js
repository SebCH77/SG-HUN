import express from "express";
import morgan from "morgan";
import cors from "cors";
import mysql from "mysql";
import path from "path";
const horarios = require("./funciones/horarios.js");
const varios = require("./funciones/varios.js");
const consultext = require("./funciones/consultext.js");
const auxclinicos = require("./funciones/auxclinicos.js");
const { fork } = require("child_process");

const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var db = mysql.createPool({
  host: "proyecto-final-hun.mysql.database.azure.com",
  user: "admin_pf@proyecto-final-hun",
  password: "#ProyectoFinal#",
  database: "proyecto-final",
  multipleStatements: true,
});

// Rutas
app.get("/areas", (req, res) => {
  let sql = `SELECT * FROM areas`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

app.get("/tiposturnos", (req, res) => {
  let sql = `SELECT * FROM tipoturnos`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

//Para la ventana de admin - Duracion de los turnos
app.get("/tiposturnos2", (req, res) => {
  let sql = `SELECT * FROM tipoturnos WHERE idTipoTurnos < 5`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

app.get("/funactivos", (req, res) => {
  let sql = `SELECT ACTIVOS.AreaOServicio, REGISTRADOS.Cantidad_registrados,  ACTIVOS.Cantidad_activos
    FROM 
    (SELECT func.AreaOServicio, COUNT(func.AreaOServicio) Cantidad_registrados
    FROM funcionarios func 
    GROUP BY func.AreaOServicio) REGISTRADOS
    INNER JOIN 
    (SELECT func.AreaOServicio, COUNT(func.Estado) Cantidad_activos
    FROM funcionarios func where func.Estado = 1 
    GROUP BY func.AreaOServicio) ACTIVOS
    ON ACTIVOS.AreaOServicio = REGISTRADOS.AreaOServicio`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

app.get("/auxclinicos", (req, response) => {
  const sql = `SELECT func.idFuncionarios, func.Cedula, func.Nombre, func.Apellido, areas.Area AreaOServicio, func.CentroDeCosto, 
  func.Cargo, func.Contrato, tipocont.Contrato TipoContrato, cargo.Cargo TipoCargo
  FROM funcionarios func 
  INNER JOIN areas areas ON func.AreaOServicio = areas.idAreas
  INNER JOIN tipocontratos tipocont ON func.Contrato = tipocont.idTipoContratos
  INNER JOIN cargo ON func.Cargo = cargo.idCargo
  WHERE func.AreaOServicio=12 AND func.Estado = 1; SELECT * FROM tipoturnos`;
  let query = db.query(sql, [1, 2], (err, result, fields) => {
    if (err) {
      throw err;
    }

    const child = fork("./funciones/auxclinicos.js", [
      JSON.stringify(result[0]),
      JSON.stringify(result[1]),
      req.query.mes,
    ]);

    req.setTimeout(0);
    child.send("start");
    child.on("message", (result) => {
      try {
        console.log(result);
        response.json(result);
      } catch (err) {
        console.log(err);
        // In case of an error, let the client know as well.
        response.status(500).send(err);
      }
    });
  });
});

app.get("/historicosauxiliares", (req, response) => {
  let sql = `SELECT turnos.idTurnos, func.idFuncionarios, func.Cedula, func.Nombre, func.Apellido, turnos.FechaInicio, tipo.HoraInicio, turnos.FechaFin, tipo.HoraFin, 
  func.CentroDeCosto, areas.Area, turnos.TipoTurno, tipocont.Contrato TipoContrato, cargo.Cargo TipoCargo
  FROM turnos turnos
  INNER JOIN funcionarios func ON turnos.Funcionario = func.idFuncionarios
  INNER JOIN tipoturnos tipo ON turnos.TipoTurno = tipo.idTipoTurnos
  INNER JOIN tipocontratos tipocont ON func.Contrato = tipocont.idTipoContratos
  INNER JOIN cargo ON func.Cargo = cargo.idCargo
  INNER JOIN areas ON areas.idAreas = func.AreaOServicio
  WHERE func.AreaOServicio = 12
  ORDER BY FechaInicio`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    response.json(result);
  });
});

app.get("/filtrar", (req, res) => {
  console.log(req.query);
  let sql = `SELECT func.idFuncionarios, func.Cedula, func.Nombre, func.Apellido FROM funcionarios func WHERE AreaOServicio="${req.query.area}" AND Estado='1';`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

app.get("/filtrartodos", (req, res) => {
  console.log(req.query);
  let sql = `SELECT func.idFuncionarios, func.Cedula, func.Nombre, func.Apellido FROM funcionarios func WHERE AreaOServicio="${req.query.area}";`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

app.get("/verificar", (req, res) => {
  let sql = "";
  if (req.query.mes == "01") {
    sql = `SELECT EXISTS(SELECT * from turnos 
      INNER JOIN funcionarios func ON turnos.Funcionario = func.idFuncionarios
      WHERE (FechaInicio="2021-${req.query.mes}-05") 
      AND func.AreaOServicio="${req.query.area}") booleano`;
  } else if (req.query.mes == "02") {
    sql = `SELECT EXISTS(SELECT * from turnos 
      INNER JOIN funcionarios func ON turnos.Funcionario = func.idFuncionarios
      WHERE (FechaInicio="2021-${req.query.mes}-02") 
      AND func.AreaOServicio="${req.query.area}") booleano`;
  } else if (req.query.mes == "03") {
    sql = `SELECT EXISTS(SELECT * from turnos 
      INNER JOIN funcionarios func ON turnos.Funcionario = func.idFuncionarios
      WHERE (FechaInicio="2021-${req.query.mes}-02") 
      AND func.AreaOServicio="${req.query.area}") booleano`;
  } else if (req.query.mes == "04") {
    sql = `SELECT EXISTS(SELECT * from turnos 
      INNER JOIN funcionarios func ON turnos.Funcionario = func.idFuncionarios
      WHERE (FechaInicio="2021-${req.query.mes}-06") 
      AND func.AreaOServicio="${req.query.area}") booleano`;
  } else if (req.query.mes == "05") {
    sql = `SELECT EXISTS(SELECT * from turnos 
      INNER JOIN funcionarios func ON turnos.Funcionario = func.idFuncionarios
      WHERE (FechaInicio="2021-${req.query.mes}-04") 
      AND func.AreaOServicio="${req.query.area}") booleano`;
  } else if (req.query.mes == "06") {
    sql = `SELECT EXISTS(SELECT * from turnos 
      INNER JOIN funcionarios func ON turnos.Funcionario = func.idFuncionarios
      WHERE (FechaInicio="2021-${req.query.mes}-08") 
      AND func.AreaOServicio="${req.query.area}") booleano`;
  } else if (req.query.mes == "07") {
    sql = `SELECT EXISTS(SELECT * from turnos 
      INNER JOIN funcionarios func ON turnos.Funcionario = func.idFuncionarios
      WHERE (FechaInicio="2021-${req.query.mes}-06") 
      AND func.AreaOServicio="${req.query.area}") booleano`;
  } else if (req.query.mes == "08") {
    sql = `SELECT EXISTS(SELECT * from turnos 
      INNER JOIN funcionarios func ON turnos.Funcionario = func.idFuncionarios
      WHERE (FechaInicio="2021-${req.query.mes}-03") 
      AND func.AreaOServicio="${req.query.area}") booleano`;
  } else if (req.query.mes == "09") {
    sql = `SELECT EXISTS(SELECT * from turnos 
      INNER JOIN funcionarios func ON turnos.Funcionario = func.idFuncionarios
      WHERE (FechaInicio="2021-${req.query.mes}-03") 
      AND func.AreaOServicio="${req.query.area}") booleano`;
  } else if (req.query.mes == "10") {
    sql = `SELECT EXISTS(SELECT * from turnos 
      INNER JOIN funcionarios func ON turnos.Funcionario = func.idFuncionarios
      WHERE (FechaInicio="2021-${req.query.mes}-03") 
      AND func.AreaOServicio="${req.query.area}") booleano`;
  }
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

app.post("/registro", (req, res) => {
  console.log(req.body);
  let post = {
    Nombre: req.body.nombre,
    Apellido: req.body.apellido,
    Cedula: req.body.cedula,
    AreaOServicio: req.body.area_servicio,
    CentroDeCosto: req.body.centro_costo,
    Cargo: req.body.cargo,
    Contrato: req.body.contrato,
    Estado: req.body.estado,
  };
  let sql = "INSERT INTO funcionarios SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

app.post("/areanueva", (req, res) => {
  console.log(req.body);
  let post = {
    Area: req.body.nombre,
  };
  let sql = "INSERT INTO areas SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

app.put("/deshabilitar", (req, res) => {
  let sql = `UPDATE funcionarios SET Estado='2' WHERE idFuncionarios='${req.body.data.idFuncionario}'`;
  console.log(sql);
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

app.put("/modificar", (req, res) => {
  console.log(req.body.data);
  let id = req.body.data.nombre;
  let sql = "";
  if (Object.keys(req.body.data).length == 3) {
    sql = `UPDATE funcionarios SET AreaOServicio='${req.body.data.opcion}', CentroDeCosto='${req.body.data.opcion2}' WHERE idFuncionarios='${id}'`;
  } else {
    if (req.body.data.opcion.criterio.charAt(0) == "A") {
      sql = `UPDATE funcionarios SET AreaOServicio='${req.body.data.opcion.valor}' WHERE idFuncionarios='${id}'`;
    } else if (req.body.data.opcion.criterio.charAt(0) == "C") {
      sql = `UPDATE funcionarios SET CentroDeCosto='${req.body.data.opcion.valor}' WHERE idFuncionarios='${id}'`;
    } else if (req.body.data.opcion.criterio.charAt(0) == "T") {
      if (req.body.data.opcion.valor.charAt(0) == "T") {
        sql = `UPDATE funcionarios SET Contrato='1' WHERE idFuncionarios='${id}'`;
      } else {
        sql = `UPDATE funcionarios SET Contrato='2' WHERE idFuncionarios='${id}'`;
      }
    } else {
      sql = `UPDATE funcionarios SET Estado='1' WHERE idFuncionarios='${id}'`;
    }
  }
  console.log(sql);
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

app.post("/registroturnos", (req, res) => {
  let turnos = req.body.registros;
  console.log(turnos);
  let sql =
    "INSERT INTO turnos (Funcionario, FechaInicio, FechaFin, TipoTurno) VALUES ?";
  let query = db.query(
    sql,
    [
      turnos.map((turno) => [
        turno.id,
        turno.start,
        turno.end,
        turno.idTipoTurno,
      ]),
    ],
    (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
      res.json(result);
    }
  );
});

app.put("/modificarturnos", (req, res) => {
  let querys = [];
  let turnos = req.body.data.turnos;
  turnos.forEach((element) => {
    let sql = `UPDATE turnos SET FechaInicio = '${element.start}', FechaFin = '${element.end}', 
    TipoTurno = '${element.idTipoTurno}' WHERE (idTurnos = '${element.idTurno}');`;
    querys.push(sql);
  });
  let str = querys.join("");
  console.log(str);
  let query = db.query(str, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

app.delete("/borrarturnos", (req, res) => {
  let querys = [];
  let turnos = req.body.turnos;
  console.log(turnos);
  turnos.forEach((element) => {
    let sql = `DELETE FROM turnos WHERE (idTurnos = '${element.idTurno}');`;
    querys.push(sql);
  });
  let str = querys.join("");
  console.log(str);
  let query = db.query(str, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

app.get("/areasnuevas", (req, res) => {
  console.log(req.query);
  let sql = `SELECT * FROM areas WHERE idAreas > 13;`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

app.get("/verificarcedula", (req, res) => {
  console.log(req.query.cedula);
  let sql = `SELECT EXISTS(SELECT * from funcionarios 
    WHERE Cedula="${req.query.cedula}" ) booleano`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

app.put("/modificartiposturnos", (req, res) => {
  let tipoturno = req.body.data;
  console.log(tipoturno);
  let sql = `UPDATE tipoturnos SET HoraInicio = '${tipoturno.start}:00', HoraFin = '${tipoturno.end}:00' WHERE (idTipoTurnos = '${tipoturno.id}');`;
  console.log(sql)
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

//--------------------------------------------------------------------
// Middleware para Vue.js router modo history
const history = require("connect-history-api-fallback");
app.use(history());
app.use(express.static(path.join(__dirname, "public")));

app.set("puerto", process.env.PORT || 3000);
app.listen(app.get("puerto"), () => {
  console.log("App listening on port: " + app.get("puerto"));
});
