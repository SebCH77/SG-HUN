process.on("message", (message) => {
  if (message === "start") {
    let res1 = process.argv[2];
    let res2 = process.argv[3];
    let mes = process.argv[4];
    res1 = JSON.parse(res1);
    res2 = JSON.parse(res2);

    if (res1.length < 10) {
      let a1 = [0];
      let a2 = [0];
      let a3 = [];
      a3.push(a1);
      a3.push(a2);
      process.send(a3);
    } else {
      let resultado = auxclinicos(res1, res2, mes);
      while (resultado[0].length == 0 || resultado[0].length == 144) {
        resultado = auxclinicos(res1, res2, mes);
      }

      if (res1.length > 10) {
        let resultadoext = auxextras(res1, res2, mes);
        while (resultadoext[0].length == 0) {
          resultadoext = auxextras(res1, res2, mes);
        }

        for (let i = 0; i < resultadoext[0].length; i++) {
          resultado[0].push(resultadoext[0][i]);
        }

        for (let j = 0; j < resultadoext[1].length; j++) {
          resultado[1].push(resultadoext[1][j]);
        }
      }

      if (mes == "03" || mes == "05" || mes == "08") {
        let resultado2 = week(res1, res2, mes);
        while (resultado2[0].length == 0 || resultado2[0].length == 36) {
          resultado2 = week(res1, res2, mes);
        }

        let array = resultado;
        for (let i = 0; i < resultado2[0].length; i++) {
          array[0].push(resultado2[0][i]);
        }

        //Funcionarios
        for (let i = 0; i < resultado[1].length; i++) {
          for (let j = 0; j < resultado2[1].length; j++) {
            if (resultado[1][i].id == resultado2[1][j].id) {
              resultado2[1][j].horarios.forEach((element) => {
                resultado[1][i].horarios.push(element);
              });
            }
          }
        }

        if (res1.length > 10) {
          let resultado2ext = weekextra(res1, res2, mes);
          while (resultado2ext[0].length == 0) {
            resultado2ext = weekextra(res1, res2, mes);
          }

          for (let i = 0; i < resultado2ext[0].length; i++) {
            array[0].push(resultado2ext[0][i]);
          }

          for (let i = 0; i < resultado[1].length; i++) {
            for (let j = 0; j < resultado2ext[1].length; j++) {
              if (resultado[1][i].id == resultado2ext[1][j].id) {
                resultado2ext[1][j].horarios.forEach((element) => {
                  resultado[1][i].horarios.push(element);
                });
              }
            }
          }
        }

        array[1] = resultado[1];
        process.send(array);
      } else {
        process.send(resultado);
      }
    }
  }
});

function auxclinicos(hp1, hp2, month) {
  const addDays = (date, days = 1) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };
  const dateRange = (start, end, range = []) => {
    if (start > end) return range;
    const next = addDays(start, 1);
    return dateRange(next, end, [...range, start]);
  };
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function findIndexInData(data, property, value) {
    var result = -1;
    data.some(function (item, i) {
      if (item[property] === value) {
        result = i;
        return true;
      }
    });
    return result;
  }

  let mesPick = month;
  let range = [];
  let limmins1 = null;
  let limmaxs1 = null;
  let limmins2 = null;
  let limmaxs2 = null;
  let limmins3 = null;
  let limmaxs3 = null;
  let limmins4 = null;
  let limmaxs4 = null;

  if (mesPick == "01") {
    range = dateRange(new Date(`2021/01/04`), new Date(`2021/01/31`));
    //LIMITES - ENERO
    limmins1 = 4;
    limmaxs1 = 10;
    limmins2 = 11;
    limmaxs2 = 17;
    limmins3 = 18;
    limmaxs3 = 24;
    limmins4 = 25;
    limmaxs4 = 31;
  } else if (mesPick == "02") {
    range = dateRange(new Date(`2021/02/01`), new Date(`2021/02/28`));
    //LIMITES - FEBRERO
    limmins1 = 1;
    limmaxs1 = 7;
    limmins2 = 8;
    limmaxs2 = 14;
    limmins3 = 15;
    limmaxs3 = 21;
    limmins4 = 22;
    limmaxs4 = 28;
  } else if (mesPick == "03") {
    range = dateRange(new Date(`2021/03/01`), new Date(`2021/03/28`));
    //LIMITES - MARZO
    limmins1 = 1;
    limmaxs1 = 7;
    limmins2 = 8;
    limmaxs2 = 14;
    limmins3 = 15;
    limmaxs3 = 21;
    limmins4 = 22;
    limmaxs4 = 28;
  } else if (mesPick == "04") {
    range = dateRange(new Date(`2021/04/05`), new Date(`2021/05/02`));
    //LIMITES - ABRIL
    limmins1 = 5;
    limmaxs1 = 11;
    limmins2 = 12;
    limmaxs2 = 18;
    limmins3 = 19;
    limmaxs3 = 25;
    limmins4 = 26;
    limmaxs4 = 2;
  } else if (mesPick == "05") {
    range = dateRange(new Date(`2021/05/03`), new Date(`2021/05/30`));
    //LIMITES - MAYO
    limmins1 = 3;
    limmaxs1 = 9;
    limmins2 = 10;
    limmaxs2 = 16;
    limmins3 = 17;
    limmaxs3 = 23;
    limmins4 = 24;
    limmaxs4 = 30;
  } else if (mesPick == "06") {
    range = dateRange(new Date(`2021/06/07`), new Date(`2021/07/04`));
    //LIMITES - JUNIO
    limmins1 = 7;
    limmaxs1 = 13;
    limmins2 = 14;
    limmaxs2 = 20;
    limmins3 = 21;
    limmaxs3 = 27;
    limmins4 = 28;
    limmaxs4 = 4;
  } else if (mesPick == "07") {
    range = dateRange(new Date(`2021/07/05`), new Date(`2021/08/01`));
    //LIMITES - JULIO
    limmins1 = 5;
    limmaxs1 = 11;
    limmins2 = 12;
    limmaxs2 = 18;
    limmins3 = 19;
    limmaxs3 = 25;
    limmins4 = 26;
    limmaxs4 = 1;
  } else if (mesPick == "08") {
    range = dateRange(new Date(`2021/08/02`), new Date(`2021/08/29`));
    //LIMITES - AGOSTO
    limmins1 = 2;
    limmaxs1 = 8;
    limmins2 = 9;
    limmaxs2 = 15;
    limmins3 = 16;
    limmaxs3 = 22;
    limmins4 = 23;
    limmaxs4 = 29;
  } else if (mesPick == "09") {
    range = dateRange(new Date(`2021/09/06`), new Date(`2021/10/03`));
    //LIMITES - SEPTIEMBRE
    limmins1 = 6;
    limmaxs1 = 12;
    limmins2 = 13;
    limmaxs2 = 19;
    limmins3 = 20;
    limmaxs3 = 26;
    limmins4 = 27;
    limmaxs4 = 3;
  } else if (mesPick == "10") {
    range = dateRange(new Date(`2021/10/04`), new Date(`2021/10/31`));
    //LIMITES - OCTUBRE
    limmins1 = 4;
    limmaxs1 = 10;
    limmins2 = 11;
    limmaxs2 = 17;
    limmins3 = 18;
    limmaxs3 = 24;
    limmins4 = 25;
    limmaxs4 = 31;
  }

  let meses = range.map((date) => date.toString().slice(6, 7));
  let fechas = range.map((date) => date.toString().slice(0, 3));
  let corridos = range.map((date) => date.toISOString().slice(0, 10));
  let noches_prev = range.map((date) => date.toISOString().slice(0, 10));
  let daynumber = range.map((date) => date.toISOString().slice(8, 10));
  let jc = range.map((date) => date.toISOString().slice(0, 10));
  let shuffle_noches = [];
  let daynumbertn = [];
  let num = 0;
  let mes = 0;
  let dias = [];

  for (let i = 0; i < daynumber.length; i++) {
    daynumbertn.push(parseInt(daynumber[i]));
  }

  let turnos_corridos = [];
  let turnos_noches_prev = [];
  let funcs = [];
  let turnos_jc = [];

  for (let i = 0; i < fechas.length; i++) {
    turnos_corridos.push({
      dia: fechas[i],
      fecha: corridos[i],
      contador: 0,
      cont_jefes: 0,
      dianum: daynumbertn[i],
    });
    turnos_noches_prev.push({
      dia: fechas[i],
      fecha: noches_prev[i],
      contador: 0,
      cont_jefes: 0,
      dianum: daynumbertn[i],
    });
    turnos_jc.push({
      dia: fechas[i],
      fecha: jc[i],
      dianum: daynumbertn[i],
    });
  }

  let shuffle_corridos = shuffle(turnos_corridos);
  let shuffle_noches_prev = shuffle(turnos_noches_prev);

  for (let i = 0; i < turnos_noches_prev.length; i++) {
    let spl = turnos_noches_prev[i].fecha.split("-");
    let splpop = spl.pop();
    let splpop_mes = spl.pop();

    if (
      splpop_mes == 1 ||
      splpop_mes == 3 ||
      splpop_mes == 5 ||
      splpop_mes == 7 ||
      splpop_mes == 8 ||
      splpop_mes == 10 ||
      splpop_mes == 11
    ) {
      if (parseInt(splpop) == 31) {
        num = 1;
      } else {
        num = parseInt(splpop) + 1;
      }
    } else if (
      splpop_mes == 4 ||
      splpop_mes == 6 ||
      splpop_mes == 9 ||
      splpop_mes == 11
    ) {
      if (parseInt(splpop) == 30) {
        num = 1;
      } else {
        num = parseInt(splpop) + 1;
      }
    } else {
      if (parseInt(splpop) == 28) {
        num = 1;
      } else {
        num = parseInt(splpop) + 1;
      }
    }

    if (num == 1) {
      mes = parseInt(splpop_mes) + 1;
      let numstringmes = mes.toString();
      if (numstringmes.length === 1) {
        numstringmes = `0${numstringmes}`;
      }
    } else {
      mes = parseInt(splpop_mes);
      let numstringmes = mes.toString();
      if (numstringmes.length === 1) {
        numstringmes = `0${numstringmes}`;
      }
    }
    let numstring = num.toString();
    let numstringmes = mes.toString();
    if (numstring.length === 1) {
      numstring = `0${numstring}`;
    }
    if (numstringmes.length === 1) {
      numstringmes = `0${numstringmes}`;
    }
    spl.push(numstringmes);
    spl.push(numstring);

    shuffle_noches.push({
      fecha: spl.join("-"),
    });
  }

  //#####################################################################
  let res = shuffle(hp1);
  let res2 = hp2;
  let events = [];
  let swit = 0;
  let cantturnos = 16;

  let n = 0;
  let i = 0;
  let je = 0;
  let jefes = [];
  let ercont = 0;
  let cant_cwf = 0;
  let cant_fpc = 4;
  let rep_unco1 = 0;
  let rep_unco2 = 0;
  let rep_unco3 = 0;
  let rep_unco4 = 0;

  let nno = 0;
  let ino = 0;
  let jeno = 0;
  let jefesno = [];
  let ercontno = 0;
  let cant_cwfno = 0;
  let cant_fpcno = 3;
  let rep_uncono1 = 0;
  let rep_uncono2 = 0;
  let rep_uncono3 = 0;
  let rep_uncono4 = 0;

  //#####################################################################
  let limh = 0;
  let limfd = 0;
  let limcor = 0;
  let limnoc = 0;
  let canth = 0;
  let cantfd = 0;
  let cantcor = 0;
  let cantnoc = 0;
  let limhc = 0;
  let limhn = 0;
  let canthc = 0;
  let canthn = 0;
  let limfdc = 0;
  let limfdn = 0;
  let cantfdc = 0;
  let cantfdn = 0;
  let limdc = 0;
  let limdn = 0;
  let cantdc = 0;
  let cantdn = 0;
  let limsc = 0;
  let limsn = 0;
  let cantsc = 0;
  let cantsn = 0;
  let limse1c = 0;
  let limse2c = 0;
  let limse3c = 0;
  let limse4c = 0;
  let limse1n = 0;
  let limse2n = 0;
  let limse3n = 0;
  let limse4n = 0;
  //#####################################################################

  let indexJc = findIndexInData(res, "idFuncionarios", 204);
  let funcjc = res.splice(indexJc, 1);

  res.unshift(funcjc[0]);

  //#####################################################################
  for (let index = 0; index < 10; index++) {
    if (swit == 1) {
      index = 0;
      swit = 0;
      je = res[index].idFuncionarios;
      jeno = res[index].idFuncionarios;
    }

    if (index == 0) {
      for (let index = 0; index < 1; index++) {
        let dayst = "";
        let daynu = 0;

        for (let i = 0; i < turnos_jc.length; i++) {
          dayst = turnos_jc[i].dia;
          daynu = turnos_jc[i].dianum;
          if (
            dayst == "Mon" ||
            dayst == "Tue" ||
            dayst == "Wed" ||
            dayst == "Thu" ||
            dayst == "Fri"
          ) {
            events.push({
              id: `${res[index].idFuncionarios}`,
              cedula: `${res[index].Cedula}`,
              tipocontrato: `${res[index].TipoContrato}`,
              cargo: `${res[index].TipoCargo}`,
              name: `${res[index].Nombre} ${res[index].Apellido}`,
              start: `${turnos_jc[i].fecha} ${res2[2].HoraInicio}`,
              end: `${turnos_jc[i].fecha} ${res2[2].HoraFin}`,
              details1: `${res[index].AreaOServicio}`,
              details2: `${res[index].CentroDeCosto}`,
              color: "#9a67ea",
              idTipoTurno: "3",
            });
          }
        }
      }
      index = 1;
    }

    je = res[index].idFuncionarios;
    i = 0;
    let pos_er = 0;
    let s1 = 0;
    let s2 = 0;
    let s3 = 0;
    let s4 = 0;
    let d = 0;
    let s = 0;
    let h = 0;
    let dayst = "";
    let daynu = 0;
    let asignadosco = [];

    jeno = res[index].idFuncionarios;
    ino = 0;
    let pos_er_no = 0;
    let s1no = 0;
    let s2no = 0;
    let s3no = 0;
    let s4no = 0;
    let dno = 0;
    let sno = 0;
    let hno = 0;
    let daystno = "";
    let daynoc = 0;
    let asignadoscono = [];
    let asignadosconopost = [];

    let asignadosrep = [];

    if (swit == 1) {
      index = 0;
      swit = 0;
      je = res[index].idFuncionarios;
      jeno = res[index].idFuncionarios;
    }

    // console.log(res[index].Contrato);
    if (res[index].Contrato == 1) {
      cantturnos = 16;
    } else {
      cantturnos = 8;
    }
    //###################################################################
    limh = 14; //Min: 10
    limfd = 6; //Min: 4
    limcor = 12; //Min: 7
    limnoc = 8; //Min: 7

    canth = 0;
    cantfd = 0;
    cantcor = 0;
    cantnoc = 0;

    limhc = 9; //Min: 2
    limhn = 7; //Min: 2

    limfdc = 4; //Min: 1
    limfdn = 3; //Min: 1

    cantfdc = 0;
    cantfdn = 0;

    //##################################################################

    limdc = 3; //Min: 0
    limdn = 3; //Min: 0

    cantdc = 0; //No need: Es d
    cantdn = 0; //No need: Es dno

    limsc = 3; //Min: 0
    limsn = 3; //Min: 0

    cantsc = 0; //No need: Es s
    cantsn = 0; //No need: Es sno

    if (res[index].Contrato == 1) {
      limse1c = 3; //Min: 1
      limse2c = 3; //Min: 1
      limse3c = 3; //Min: 1
      limse4c = 3; //Min: 1

      limse1n = 3; //Min: 1
      limse2n = 3; //Min: 1
      limse3n = 3; //Min: 1
      limse4n = 3; //Min: 1
    } else {
      limse1c = 1; //Min: 1
      limse2c = 1; //Min: 1
      limse3c = 1; //Min: 1
      limse4c = 1; //Min: 1

      limse1n = 1; //Min: 1
      limse2n = 1; //Min: 1
      limse3n = 1; //Min: 1
      limse4n = 1; //Min: 1
    }

    //###################################################################
    while (i + ino < cantturnos) {
      if (cantcor < limcor) {
        if (n == shuffle_corridos.length) {
          n = 0;
        }

        dayst = shuffle_corridos[n].dia;
        daynu = shuffle_corridos[n].dianum;

        if (cant_cwf == 5) {
          cant_fpc = 3;
        }

        if (shuffle_corridos[n].contador < cant_fpc) {
          events.push({
            id: `${res[index].idFuncionarios}`,
            cedula: `${res[index].Cedula}`,
            tipocontrato: `${res[index].TipoContrato}`,
            cargo: `${res[index].TipoCargo}`,
            name: `${res[index].Nombre} ${res[index].Apellido}`,
            start: `${shuffle_corridos[n].fecha} ${res2[0].HoraInicio}`,
            end: `${shuffle_corridos[n].fecha} ${res2[0].HoraFin}`,
            details1: `${res[index].AreaOServicio}`,
            details2: `${res[index].CentroDeCosto}`,
            color: "green",
            idTipoTurno: "1",
          });

          if (dayst == "Sun") {
            if (d < limdc && cantfdc < limfdc && cantfd < limfd) {
              if (
                !asignadosco.includes(daynu) &&
                !asignadoscono.includes(daynu) &&
                !asignadosconopost.includes(daynu)
              ) {
                // if (
                //   (!asignadosco.includes(daynu + 1) || !asignadosco.includes(daynu - 1)) &&
                //   (!asignadosco.includes(daynu + 1) || !asignadosco.includes(daynu + 2)) &&
                //   (!asignadosco.includes(daynu - 1) || !asignadosco.includes(daynu - 2))
                // ) {
                if (limmins1 <= daynu && daynu <= limmaxs1) {
                  if (s1 < limse1c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    d++;
                    i++;
                    s1++;
                    cantcor++;
                    cantfdc++;
                    cantfd++;
                    pos_er = 0;

                    if (s1 == 2) {
                      limse1n = 2;
                    } else if (s1 == 3) {
                      limse1n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else if (limmins2 <= daynu && daynu <= limmaxs2) {
                  if (s2 < limse2c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    d++;
                    i++;
                    s2++;
                    cantcor++;
                    cantfdc++;
                    cantfd++;
                    pos_er = 0;

                    if (s2 == 2) {
                      limse2n = 2;
                    } else if (s2 == 3) {
                      limse2n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else if (limmins3 <= daynu && daynu <= limmaxs3) {
                  if (s3 < limse3c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    d++;
                    i++;
                    s3++;
                    cantcor++;
                    cantfdc++;
                    cantfd++;
                    pos_er = 0;

                    if (s3 == 2) {
                      limse3n = 2;
                    } else if (s3 == 3) {
                      limse3n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else {
                  if (s4 < limse4c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    d++;
                    i++;
                    s4++;
                    cantcor++;
                    cantfdc++;
                    cantfd++;
                    pos_er = 0;

                    if (s4 == 2) {
                      limse4n = 2;
                    } else if (s4 == 3) {
                      limse4n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                }
                // } else {
                //   events.pop();
                //   pos_er++;
                // }
              } else {
                events.pop();
                pos_er++;
              }
            } else {
              events.pop();
              pos_er++;
            }
          }
          if (dayst == "Sat") {
            if (s < limsc && cantfdc < limfdc && cantfd < limfd) {
              if (
                !asignadosco.includes(daynu) &&
                !asignadoscono.includes(daynu) &&
                !asignadosconopost.includes(daynu)
              ) {
                // if (
                //   (!asignadosco.includes(daynu + 1) || !asignadosco.includes(daynu - 1)) &&
                //   (!asignadosco.includes(daynu + 1) || !asignadosco.includes(daynu + 2)) &&
                //   (!asignadosco.includes(daynu - 1) || !asignadosco.includes(daynu - 2))
                // ) {
                //.............AUXILIARES..............
                if (limmins1 <= daynu && daynu <= limmaxs1) {
                  if (s1 < limse1c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    s++;
                    i++;
                    s1++;
                    cantcor++;
                    cantfdc++;
                    cantfd++;
                    pos_er = 0;

                    if (s1 == 2) {
                      limse1n = 2;
                    } else if (s1 == 3) {
                      limse1n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else if (limmins2 <= daynu && daynu <= limmaxs2) {
                  if (s2 < limse2c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    s++;
                    i++;
                    s2++;
                    cantcor++;
                    cantfdc++;
                    cantfd++;
                    pos_er = 0;

                    if (s2 == 2) {
                      limse2n = 2;
                    } else if (s2 == 3) {
                      limse2n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else if (limmins3 <= daynu && daynu <= limmaxs3) {
                  if (s3 < limse3c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    s++;
                    i++;
                    s3++;
                    cantcor++;
                    cantfdc++;
                    cantfd++;
                    pos_er = 0;

                    if (s3 == 2) {
                      limse3n = 2;
                    } else if (s3 == 3) {
                      limse3n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else {
                  if (s4 < limse4c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    s++;
                    i++;
                    s4++;
                    cantcor++;
                    cantfdc++;
                    cantfd++;
                    pos_er = 0;

                    if (s4 == 2) {
                      limse4n = 2;
                    } else if (s4 == 3) {
                      limse4n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                }
                // } else {
                //   events.pop();
                //   pos_er++;
                // }
              } else {
                events.pop();
                pos_er++;
              }
            } else {
              events.pop();
              pos_er++;
            }
          }
          if (
            dayst == "Mon" ||
            dayst == "Tue" ||
            dayst == "Wed" ||
            dayst == "Thu" ||
            dayst == "Fri"
          ) {
            if (h < limhc && canth < limh) {
              if (
                !asignadosco.includes(daynu) &&
                !asignadoscono.includes(daynu) &&
                !asignadosconopost.includes(daynu)
              ) {
                // if (
                //   (!asignadosco.includes(daynu + 1) || !asignadosco.includes(daynu - 1)) &&
                //   (!asignadosco.includes(daynu + 1) || !asignadosco.includes(daynu + 2)) &&
                //   (!asignadosco.includes(daynu - 1) || !asignadosco.includes(daynu - 2))
                // ) {
                //.............AUXILIARES..............
                if (limmins1 <= daynu && daynu <= limmaxs1) {
                  if (s1 < limse1c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    h++;
                    i++;
                    s1++;
                    cantcor++;
                    canth++;
                    pos_er = 0;
                    if (s1 == 2) {
                      limse1n = 2;
                    } else if (s1 == 3) {
                      limse1n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else if (limmins2 <= daynu && daynu <= limmaxs2) {
                  if (s2 < limse2c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    h++;
                    i++;
                    s2++;
                    cantcor++;
                    canth++;
                    pos_er = 0;
                    if (s2 == 2) {
                      limse2n = 2;
                    } else if (s2 == 3) {
                      limse2n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else if (limmins3 <= daynu && daynu <= limmaxs3) {
                  if (s3 < limse3c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    h++;
                    i++;
                    s3++;
                    cantcor++;
                    canth++;
                    pos_er = 0;
                    if (s3 == 2) {
                      limse3n = 2;
                    } else if (s3 == 3) {
                      limse3n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else {
                  if (s4 < limse4c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    h++;
                    i++;
                    s4++;
                    cantcor++;
                    canth++;
                    pos_er = 0;
                    if (s4 == 2) {
                      limse4n = 2;
                    } else if (s4 == 3) {
                      limse4n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                }
                // } else {
                //   events.pop();
                //   pos_er++;
                // }
              } else {
                events.pop();
                pos_er++;
              }
            } else {
              events.pop();
              pos_er++;
            }
          }
        } else {
          pos_er++;
        }

        n += 1;
        if (cantcor == 8) {
          limhn = 7;
        } else if (cantcor == 9) {
          limhn = 6;
        } else if (cantcor == 10) {
          limhn = 5;
        } else if (cantcor == 11) {
          limhn = 4;
        } else if (cantcor == 12) {
          limhn = 3;
        }
      }

      //....................................................................NOCHES........................................................................
      if (cantnoc < limnoc) {
        if (nno == shuffle_noches_prev.length) {
          nno = 0;
        }
        daystno = shuffle_noches_prev[nno].dia;
        daynoc = shuffle_noches_prev[nno].dianum;

        if (cant_cwfno == 1) {
          cant_fpcno = 2;
        }

        if (shuffle_noches_prev[nno].contador < cant_fpcno) {
          events.push({
            id: `${res[index].idFuncionarios}`,
            cedula: `${res[index].Cedula}`,
            tipocontrato: `${res[index].TipoContrato}`,
            cargo: `${res[index].TipoCargo}`,
            name: `${res[index].Nombre} ${res[index].Apellido}`,
            start: `${shuffle_noches_prev[nno].fecha} ${res2[1].HoraInicio}`,
            end: `${shuffle_noches[nno].fecha} ${res2[1].HoraFin}`,
            details1: `${res[index].AreaOServicio}`,
            details2: `${res[index].CentroDeCosto}`,
            color: "light-blue darken-4",
            idTipoTurno: "2",
          });

          if (daystno == "Sun") {
            if (d < limdn && cantfdn < limfdn && cantfd < limfd) {
              if (
                !asignadosco.includes(daynoc) &&
                !asignadosco.includes(daynoc + 1) &&
                !asignadoscono.includes(daynoc) &&
                !asignadoscono.includes(daynoc + 1) &&
                !asignadoscono.includes(daynoc - 1)
              ) {
                //.............AUXILIARES..............
                if (limmins1 <= daynoc && daynoc <= limmaxs1) {
                  if (s1no < limse1n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    dno++;
                    ino++;
                    s1no++;
                    cantnoc++;
                    cantfdn++;
                    cantfd++;
                    pos_er_no = 0;

                    if (s1no == 2) {
                      limse1c = 2;
                    } else if (s1no == 3) {
                      limse1c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                } else if (limmins2 <= daynoc && daynoc <= limmaxs2) {
                  if (s2no < limse2n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    dno++;
                    ino++;
                    s2no++;
                    cantnoc++;
                    cantfdn++;
                    cantfd++;
                    pos_er_no = 0;

                    if (s2no == 2) {
                      limse2c = 2;
                    } else if (s2no == 3) {
                      limse2c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                } else if (limmins3 <= daynoc && daynoc <= limmaxs3) {
                  if (s3no < limse3n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    dno++;
                    ino++;
                    s3no++;
                    cantnoc++;
                    cantfdn++;
                    cantfd++;
                    pos_er_no = 0;

                    if (s3no == 2) {
                      limse3c = 2;
                    } else if (s3no == 3) {
                      limse3c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                } else {
                  if (s4no < limse4n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    dno++;
                    ino++;
                    s4no++;
                    cantnoc++;
                    cantfdn++;
                    cantfd++;
                    pos_er_no = 0;

                    if (s4no == 2) {
                      limse4c = 2;
                    } else if (s4no == 3) {
                      limse4c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                }
              } else {
                events.pop();
                pos_er_no++;
              }
            } else {
              events.pop();
              pos_er_no++;
            }
          }
          if (daystno == "Sat") {
            if (sno < limsn && cantfdn < limfdn && cantfd < limfd) {
              if (
                !asignadosco.includes(daynoc) &&
                !asignadosco.includes(daynoc + 1) &&
                !asignadoscono.includes(daynoc) &&
                !asignadoscono.includes(daynoc + 1) &&
                !asignadoscono.includes(daynoc - 1)
              ) {
                //.............AUXILIARES..............
                if (limmins1 <= daynoc && daynoc <= limmaxs1) {
                  if (s1no < limse1n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    sno++;
                    ino++;
                    s1no++;
                    cantnoc++;
                    cantfdn++;
                    cantfd++;
                    pos_er_no = 0;

                    if (s1no == 2) {
                      limse1c = 2;
                    } else if (s1no == 3) {
                      limse1c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                } else if (limmins2 <= daynoc && daynoc <= limmaxs2) {
                  if (s2no < limse2n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    sno++;
                    ino++;
                    s2no++;
                    cantnoc++;
                    cantfdn++;
                    cantfd++;
                    pos_er_no = 0;

                    if (s2no == 2) {
                      limse2c = 2;
                    } else if (s2no == 3) {
                      limse2c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                } else if (limmins3 <= daynoc && daynoc <= limmaxs3) {
                  if (s3no < limse3n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    sno++;
                    ino++;
                    s3no++;
                    cantnoc++;
                    cantfdn++;
                    cantfd++;
                    pos_er_no = 0;

                    if (s3no == 2) {
                      limse3c = 2;
                    } else if (s3no == 3) {
                      limse3c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                } else {
                  if (s4no < limse4n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    sno++;
                    ino++;
                    s4no++;
                    cantnoc++;
                    cantfdn++;
                    cantfd++;
                    pos_er_no = 0;

                    if (s4no == 2) {
                      limse4c = 2;
                    } else if (s4no == 3) {
                      limse4c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                }
              } else {
                events.pop();
                pos_er_no++;
              }
            } else {
              events.pop();
              pos_er_no++;
            }
          }
          if (
            daystno == "Mon" ||
            daystno == "Tue" ||
            daystno == "Wed" ||
            daystno == "Thu" ||
            daystno == "Fri"
          ) {
            if (hno < limhn && canth < limh) {
              if (
                !asignadosco.includes(daynoc) &&
                !asignadosco.includes(daynoc + 1) &&
                !asignadoscono.includes(daynoc) &&
                !asignadoscono.includes(daynoc + 1) &&
                !asignadoscono.includes(daynoc - 1)
              ) {
                //.............AUXILIARES..............
                if (limmins1 <= daynoc && daynoc <= limmaxs1) {
                  if (s1no < limse1n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    hno++;
                    ino++;
                    s1no++;
                    cantnoc++;
                    canth++;
                    pos_er_no = 0;
                    if (s1no == 2) {
                      limse1c = 2;
                    } else if (s1no == 3) {
                      limse1c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                } else if (limmins2 <= daynoc && daynoc <= limmaxs2) {
                  if (s2no < limse2n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    hno++;
                    ino++;
                    s2no++;
                    cantnoc++;
                    canth++;
                    pos_er_no = 0;
                    if (s2no == 2) {
                      limse2c = 2;
                    } else if (s2no == 3) {
                      limse2c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                } else if (limmins3 <= daynoc && daynoc <= limmaxs3) {
                  if (s3no < limse3n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    hno++;
                    ino++;
                    s3no++;
                    cantnoc++;
                    canth++;
                    pos_er_no = 0;
                    if (s3no == 2) {
                      limse3c = 2;
                    } else if (s3no == 3) {
                      limse3c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                } else {
                  if (s4no < limse4n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    hno++;
                    ino++;
                    s4no++;
                    cantnoc++;
                    canth++;
                    pos_er_no = 0;
                    if (s4no == 2) {
                      limse4c = 2;
                    } else if (s4no == 3) {
                      limse4c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                }
              } else {
                events.pop();
                pos_er_no++;
              }
            } else {
              events.pop();
              pos_er_no++;
            }
          }
        } else {
          pos_er_no++;
        }

        nno += 1;

        if (cantnoc == 8) {
          limhc = 7;
        }
      }

      //.........................................................FIN NOCHES.................................................................

      if (pos_er == 30 || pos_er_no == 30) {
        events = [];
        swit = 1;
        ercont++;
        pos_er = 0;
        n = 0;
        i = 0;
        s1 = 0;
        s2 = 0;
        s3 = 0;
        s4 = 0;
        d = 0;
        s = 0;
        h = 0;
        je = 0;
        dayst = "";
        daynu = 0;
        cantcor = 0;
        cantfdc = 0;
        asignadosco = [];
        cant_cwf = 0;
        cant_fpc = 4;
        rep_unco1 = 0;
        rep_unco2 = 0;
        rep_unco3 = 0;
        rep_unco4 = 0;

        shuffle_corridos = shuffle(shuffle_corridos);
        for (let p = 0; p < shuffle_corridos.length; p++) {
          shuffle_corridos[p].contador = 0;
          shuffle_corridos[p].cont_jefes = 0;
        }

        ercontno++;
        pos_er_no = 0;
        nno = 0;
        ino = 0;
        s1no = 0;
        s2no = 0;
        s3no = 0;
        s4no = 0;
        dno = 0;
        sno = 0;
        hno = 0;
        jeno = 0;
        daystno = "";
        daynoc = 0;
        cantnoc = 0;
        cantfdn = 0;
        asignadoscono = [];
        asignadosconopost = [];
        cant_cwfno = 0;
        cant_fpcno = 3;
        rep_uncono1 = 0;
        rep_uncono2 = 0;
        rep_uncono3 = 0;
        rep_uncono4 = 0;

        shuffle_noches = [];
        shuffle_noches_prev = shuffle(shuffle_noches_prev);
        for (let p = 0; p < shuffle_noches_prev.length; p++) {
          shuffle_noches_prev[p].contador = 0;
          shuffle_noches_prev[p].cont_jefes = 0;
        }
        for (let i = 0; i < turnos_noches_prev.length; i++) {
          let spl = turnos_noches_prev[i].fecha.split("-");
          let splpop = spl.pop();
          let splpop_mes = spl.pop();

          if (
            splpop_mes == 1 ||
            splpop_mes == 3 ||
            splpop_mes == 5 ||
            splpop_mes == 7 ||
            splpop_mes == 8 ||
            splpop_mes == 10 ||
            splpop_mes == 11
          ) {
            if (parseInt(splpop) == 31) {
              num = 1;
            } else {
              num = parseInt(splpop) + 1;
            }
          } else if (
            splpop_mes == 4 ||
            splpop_mes == 6 ||
            splpop_mes == 9 ||
            splpop_mes == 11
          ) {
            if (parseInt(splpop) == 30) {
              num = 1;
            } else {
              num = parseInt(splpop) + 1;
            }
          } else {
            if (parseInt(splpop) == 28) {
              num = 1;
            } else {
              num = parseInt(splpop) + 1;
            }
          }

          if (num == 1) {
            mes = parseInt(splpop_mes) + 1;
            let numstringmes = mes.toString();
            if (numstringmes.length === 1) {
              numstringmes = `0${numstringmes}`;
            }
          } else {
            mes = parseInt(splpop_mes);
            let numstringmes = mes.toString();
            if (numstringmes.length === 1) {
              numstringmes = `0${numstringmes}`;
            }
          }
          let numstring = num.toString();
          let numstringmes = mes.toString();
          if (numstring.length === 1) {
            numstring = `0${numstring}`;
          }
          if (numstringmes.length === 1) {
            numstringmes = `0${numstringmes}`;
          }
          spl.push(numstringmes);
          spl.push(numstring);

          shuffle_noches.push({
            fecha: spl.join("-"),
          });
        }

        break;
      }
    }
  }

  let funcionarios = [];
  let nombre = "";
  let registros = [];
  let count = 0;
  for (let i = 0; i < events.length; i++) {
    nombre = events[i].name;
    if (!registros.includes(nombre)) {
      registros.push(nombre);
      funcionarios.push({
        id: events[i].id,
        name: events[i].name,
        horarios: [],
      });
      events.forEach((element) => {
        if (element.name == funcionarios[count].name) {
          funcionarios[count].horarios.push({
            id: `${element.id}`,
            cedula: `${element.cedula}`,
            tipocontrato: `${element.tipocontrato}`,
            cargo: `${element.cargo}`,
            name: `${element.name}`,
            details1: `${element.details1}`,
            details2: `${element.details2}`,
            start: `${element.start}`,
            end: `${element.end}`,
            color: `${element.color}`,
            idTipoTurno: `${element.idTipoTurno}`,
          });
        }
      });
      count++;
    }
  }

  let returnArray = [];
  returnArray.push(events);
  returnArray.push(funcionarios);
  return returnArray;
}

//Funcionarios Extras

function auxextras(hp1, hp2, month) {
  const addDays = (date, days = 1) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };
  const dateRange = (start, end, range = []) => {
    if (start > end) return range;
    const next = addDays(start, 1);
    return dateRange(next, end, [...range, start]);
  };
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  let mesPick = month;
  let range = [];
  let limmins1 = null;
  let limmaxs1 = null;
  let limmins2 = null;
  let limmaxs2 = null;
  let limmins3 = null;
  let limmaxs3 = null;
  let limmins4 = null;
  let limmaxs4 = null;

  if (mesPick == "01") {
    range = dateRange(new Date(`2021/01/04`), new Date(`2021/01/31`));
    //LIMITES - ENERO
    limmins1 = 4;
    limmaxs1 = 10;
    limmins2 = 11;
    limmaxs2 = 17;
    limmins3 = 18;
    limmaxs3 = 24;
    limmins4 = 25;
    limmaxs4 = 31;
  } else if (mesPick == "02") {
    range = dateRange(new Date(`2021/02/01`), new Date(`2021/02/28`));
    //LIMITES - FEBRERO
    limmins1 = 1;
    limmaxs1 = 7;
    limmins2 = 8;
    limmaxs2 = 14;
    limmins3 = 15;
    limmaxs3 = 21;
    limmins4 = 22;
    limmaxs4 = 28;
  } else if (mesPick == "03") {
    range = dateRange(new Date(`2021/03/01`), new Date(`2021/03/28`));
    //LIMITES - MARZO
    limmins1 = 1;
    limmaxs1 = 7;
    limmins2 = 8;
    limmaxs2 = 14;
    limmins3 = 15;
    limmaxs3 = 21;
    limmins4 = 22;
    limmaxs4 = 28;
  } else if (mesPick == "04") {
    range = dateRange(new Date(`2021/04/05`), new Date(`2021/05/02`));
    //LIMITES - ABRIL
    limmins1 = 5;
    limmaxs1 = 11;
    limmins2 = 12;
    limmaxs2 = 18;
    limmins3 = 19;
    limmaxs3 = 25;
    limmins4 = 26;
    limmaxs4 = 2;
  } else if (mesPick == "05") {
    range = dateRange(new Date(`2021/05/03`), new Date(`2021/05/30`));
    //LIMITES - MAYO
    limmins1 = 3;
    limmaxs1 = 9;
    limmins2 = 10;
    limmaxs2 = 16;
    limmins3 = 17;
    limmaxs3 = 23;
    limmins4 = 24;
    limmaxs4 = 30;
  } else if (mesPick == "06") {
    range = dateRange(new Date(`2021/06/07`), new Date(`2021/07/04`));
    //LIMITES - JUNIO
    limmins1 = 7;
    limmaxs1 = 13;
    limmins2 = 14;
    limmaxs2 = 20;
    limmins3 = 21;
    limmaxs3 = 27;
    limmins4 = 28;
    limmaxs4 = 4;
  } else if (mesPick == "07") {
    range = dateRange(new Date(`2021/07/05`), new Date(`2021/08/01`));
    //LIMITES - JULIO
    limmins1 = 5;
    limmaxs1 = 11;
    limmins2 = 12;
    limmaxs2 = 18;
    limmins3 = 19;
    limmaxs3 = 25;
    limmins4 = 26;
    limmaxs4 = 1;
  } else if (mesPick == "08") {
    range = dateRange(new Date(`2021/08/02`), new Date(`2021/08/29`));
    //LIMITES - AGOSTO
    limmins1 = 2;
    limmaxs1 = 8;
    limmins2 = 9;
    limmaxs2 = 15;
    limmins3 = 16;
    limmaxs3 = 22;
    limmins4 = 23;
    limmaxs4 = 29;
  } else if (mesPick == "09") {
    range = dateRange(new Date(`2021/09/06`), new Date(`2021/10/03`));
    //LIMITES - SEPTIEMBRE
    limmins1 = 6;
    limmaxs1 = 12;
    limmins2 = 13;
    limmaxs2 = 19;
    limmins3 = 20;
    limmaxs3 = 26;
    limmins4 = 27;
    limmaxs4 = 3;
  } else if (mesPick == "10") {
    range = dateRange(new Date(`2021/10/04`), new Date(`2021/10/31`));
    //LIMITES - OCTUBRE
    limmins1 = 4;
    limmaxs1 = 10;
    limmins2 = 11;
    limmaxs2 = 17;
    limmins3 = 18;
    limmaxs3 = 24;
    limmins4 = 25;
    limmaxs4 = 31;
  }

  let meses = range.map((date) => date.toString().slice(6, 7));
  let fechas = range.map((date) => date.toString().slice(0, 3));
  let corridos = range.map((date) => date.toISOString().slice(0, 10));
  let noches_prev = range.map((date) => date.toISOString().slice(0, 10));
  let daynumber = range.map((date) => date.toISOString().slice(8, 10));
  let jc = range.map((date) => date.toISOString().slice(0, 10));
  let shuffle_noches = [];
  let daynumbertn = [];
  let num = 0;
  let mes = 0;
  let dias = [];

  for (let i = 0; i < daynumber.length; i++) {
    daynumbertn.push(parseInt(daynumber[i]));
  }

  let turnos_corridos = [];
  let turnos_noches_prev = [];
  let funcs = [];
  let turnos_jc = [];

  for (let i = 0; i < fechas.length; i++) {
    turnos_corridos.push({
      dia: fechas[i],
      fecha: corridos[i],
      contador: 0,
      cont_jefes: 0,
      dianum: daynumbertn[i],
    });
    turnos_noches_prev.push({
      dia: fechas[i],
      fecha: noches_prev[i],
      contador: 0,
      cont_jefes: 0,
      dianum: daynumbertn[i],
    });
    turnos_jc.push({
      dia: fechas[i],
      fecha: jc[i],
      dianum: daynumbertn[i],
    });
  }

  let shuffle_corridos = shuffle(turnos_corridos);
  let shuffle_noches_prev = shuffle(turnos_noches_prev);

  for (let i = 0; i < turnos_noches_prev.length; i++) {
    let spl = turnos_noches_prev[i].fecha.split("-");
    let splpop = spl.pop();
    let splpop_mes = spl.pop();

    if (
      splpop_mes == 1 ||
      splpop_mes == 3 ||
      splpop_mes == 5 ||
      splpop_mes == 7 ||
      splpop_mes == 8 ||
      splpop_mes == 10 ||
      splpop_mes == 11
    ) {
      if (parseInt(splpop) == 31) {
        num = 1;
      } else {
        num = parseInt(splpop) + 1;
      }
    } else if (
      splpop_mes == 4 ||
      splpop_mes == 6 ||
      splpop_mes == 9 ||
      splpop_mes == 11
    ) {
      if (parseInt(splpop) == 30) {
        num = 1;
      } else {
        num = parseInt(splpop) + 1;
      }
    } else {
      if (parseInt(splpop) == 28) {
        num = 1;
      } else {
        num = parseInt(splpop) + 1;
      }
    }

    if (num == 1) {
      mes = parseInt(splpop_mes) + 1;
      let numstringmes = mes.toString();
      if (numstringmes.length === 1) {
        numstringmes = `0${numstringmes}`;
      }
    } else {
      mes = parseInt(splpop_mes);
      let numstringmes = mes.toString();
      if (numstringmes.length === 1) {
        numstringmes = `0${numstringmes}`;
      }
    }
    let numstring = num.toString();
    let numstringmes = mes.toString();
    if (numstring.length === 1) {
      numstring = `0${numstring}`;
    }
    if (numstringmes.length === 1) {
      numstringmes = `0${numstringmes}`;
    }
    spl.push(numstringmes);
    spl.push(numstring);

    shuffle_noches.push({
      fecha: spl.join("-"),
    });
  }

  //#####################################################################
  let res = hp1;
  let res2 = hp2;
  let events = [];
  let swit = 0;
  let cantturnos = 16;

  let n = 0;
  let i = 0;
  let je = 0;
  let jefes = [];
  let ercont = 0;
  let cant_cwf = 0;
  let cant_fpc = 4;
  let rep_unco1 = 0;
  let rep_unco2 = 0;
  let rep_unco3 = 0;
  let rep_unco4 = 0;

  let nno = 0;
  let ino = 0;
  let jeno = 0;
  let jefesno = [];
  let ercontno = 0;
  let cant_cwfno = 0;
  let cant_fpcno = 3;
  let rep_uncono1 = 0;
  let rep_uncono2 = 0;
  let rep_uncono3 = 0;
  let rep_uncono4 = 0;

  //#####################################################################
  let limh = 0;
  let limfd = 0;
  let limcor = 0;
  let limnoc = 0;
  let canth = 0;
  let cantfd = 0;
  let cantcor = 0;
  let cantnoc = 0;
  let limhc = 0;
  let limhn = 0;
  let canthc = 0;
  let canthn = 0;
  let limfdc = 0;
  let limfdn = 0;
  let cantfdc = 0;
  let cantfdn = 0;
  let limdc = 0;
  let limdn = 0;
  let cantdc = 0;
  let cantdn = 0;
  let limsc = 0;
  let limsn = 0;
  let cantsc = 0;
  let cantsn = 0;
  let limse1c = 0;
  let limse2c = 0;
  let limse3c = 0;
  let limse4c = 0;
  let limse1n = 0;
  let limse2n = 0;
  let limse3n = 0;
  let limse4n = 0;

  for (let index = 10; index < res.length; index++) {
    je = res[index].idFuncionarios;
    i = 0;
    let pos_er = 0;
    let s1 = 0;
    let s2 = 0;
    let s3 = 0;
    let s4 = 0;
    let d = 0;
    let s = 0;
    let h = 0;
    let dayst = "";
    let daynu = 0;
    let asignadosco = [];

    jeno = res[index].idFuncionarios;
    ino = 0;
    let pos_er_no = 0;
    let s1no = 0;
    let s2no = 0;
    let s3no = 0;
    let s4no = 0;
    let dno = 0;
    let sno = 0;
    let hno = 0;
    let daystno = "";
    let daynoc = 0;
    let asignadoscono = [];
    let asignadosconopost = [];

    let asignadosrep = [];

    if (swit == 1) {
      index = 10;
      swit = 0;
      je = res[index].idFuncionarios;
      jeno = res[index].idFuncionarios;
    }

    // console.log(res[index].Contrato);
    if (res[index].Contrato == 1) {
      cantturnos = 16;
    } else {
      cantturnos = 8;
    }
    //###################################################################
    limh = 14; //Min: 10
    limfd = 6; //Min: 4
    limcor = 12; //Min: 7
    limnoc = 8; //Min: 7

    canth = 0;
    cantfd = 0;
    cantcor = 0;
    cantnoc = 0;

    limhc = 9; //Min: 2
    limhn = 7; //Min: 2

    limfdc = 4; //Min: 1
    limfdn = 3; //Min: 1

    cantfdc = 0;
    cantfdn = 0;

    //##################################################################

    limdc = 3; //Min: 0
    limdn = 3; //Min: 0

    cantdc = 0; //No need: Es d
    cantdn = 0; //No need: Es dno

    limsc = 3; //Min: 0
    limsn = 3; //Min: 0

    cantsc = 0; //No need: Es s
    cantsn = 0; //No need: Es sno

    if (res[index].Contrato == 1) {
      limse1c = 3; //Min: 1
      limse2c = 3; //Min: 1
      limse3c = 3; //Min: 1
      limse4c = 3; //Min: 1

      limse1n = 3; //Min: 1
      limse2n = 3; //Min: 1
      limse3n = 3; //Min: 1
      limse4n = 3; //Min: 1
    } else {
      limse1c = 1; //Min: 1
      limse2c = 1; //Min: 1
      limse3c = 1; //Min: 1
      limse4c = 1; //Min: 1

      limse1n = 1; //Min: 1
      limse2n = 1; //Min: 1
      limse3n = 1; //Min: 1
      limse4n = 1; //Min: 1
    }
    //###################################################################
    while (i + ino < cantturnos) {
      if (cantcor < limcor) {
        if (n == shuffle_corridos.length) {
          n = 0;
        }

        dayst = shuffle_corridos[n].dia;
        daynu = shuffle_corridos[n].dianum;

        if (cant_cwf == 6) {
          cant_fpc = 3;
        }

        if (shuffle_corridos[n].contador < cant_fpc) {
          events.push({
            id: `${res[index].idFuncionarios}`,
            cedula: `${res[index].Cedula}`,
            tipocontrato: `${res[index].TipoContrato}`,
            cargo: `${res[index].TipoCargo}`,
            name: `${res[index].Nombre} ${res[index].Apellido}`,
            start: `${shuffle_corridos[n].fecha} ${res2[0].HoraInicio}`,
            end: `${shuffle_corridos[n].fecha} ${res2[0].HoraFin}`,
            details1: `${res[index].AreaOServicio}`,
            details2: `${res[index].CentroDeCosto}`,
            color: "green",
            idTipoTurno: "1",
          });

          if (dayst == "Sun") {
            if (d < limdc && cantfdc < limfdc && cantfd < limfd) {
              if (
                !asignadosco.includes(daynu) &&
                !asignadoscono.includes(daynu) &&
                !asignadosconopost.includes(daynu)
              ) {
                // if (
                //   (!asignadosco.includes(daynu + 1) || !asignadosco.includes(daynu - 1)) &&
                //   (!asignadosco.includes(daynu + 1) || !asignadosco.includes(daynu + 2)) &&
                //   (!asignadosco.includes(daynu - 1) || !asignadosco.includes(daynu - 2))
                // ) {
                if (limmins1 <= daynu && daynu <= limmaxs1) {
                  if (s1 < limse1c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    d++;
                    i++;
                    s1++;
                    cantcor++;
                    cantfdc++;
                    cantfd++;
                    pos_er = 0;

                    if (s1 == 2) {
                      limse1n = 2;
                    } else if (s1 == 3) {
                      limse1n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else if (limmins2 <= daynu && daynu <= limmaxs2) {
                  if (s2 < limse2c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    d++;
                    i++;
                    s2++;
                    cantcor++;
                    cantfdc++;
                    cantfd++;
                    pos_er = 0;

                    if (s2 == 2) {
                      limse2n = 2;
                    } else if (s2 == 3) {
                      limse2n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else if (limmins3 <= daynu && daynu <= limmaxs3) {
                  if (s3 < limse3c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    d++;
                    i++;
                    s3++;
                    cantcor++;
                    cantfdc++;
                    cantfd++;
                    pos_er = 0;

                    if (s3 == 2) {
                      limse3n = 2;
                    } else if (s3 == 3) {
                      limse3n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else {
                  if (s4 < limse4c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    d++;
                    i++;
                    s4++;
                    cantcor++;
                    cantfdc++;
                    cantfd++;
                    pos_er = 0;

                    if (s4 == 2) {
                      limse4n = 2;
                    } else if (s4 == 3) {
                      limse4n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                }
                // } else {
                //   events.pop();
                //   pos_er++;
                // }
              } else {
                events.pop();
                pos_er++;
              }
            } else {
              events.pop();
              pos_er++;
            }
          }
          if (dayst == "Sat") {
            if (s < limsc && cantfdc < limfdc && cantfd < limfd) {
              if (
                !asignadosco.includes(daynu) &&
                !asignadoscono.includes(daynu) &&
                !asignadosconopost.includes(daynu)
              ) {
                // if (
                //   (!asignadosco.includes(daynu + 1) || !asignadosco.includes(daynu - 1)) &&
                //   (!asignadosco.includes(daynu + 1) || !asignadosco.includes(daynu + 2)) &&
                //   (!asignadosco.includes(daynu - 1) || !asignadosco.includes(daynu - 2))
                // ) {
                //.............AUXILIARES..............
                if (limmins1 <= daynu && daynu <= limmaxs1) {
                  if (s1 < limse1c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    s++;
                    i++;
                    s1++;
                    cantcor++;
                    cantfdc++;
                    cantfd++;
                    pos_er = 0;

                    if (s1 == 2) {
                      limse1n = 2;
                    } else if (s1 == 3) {
                      limse1n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else if (limmins2 <= daynu && daynu <= limmaxs2) {
                  if (s2 < limse2c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    s++;
                    i++;
                    s2++;
                    cantcor++;
                    cantfdc++;
                    cantfd++;
                    pos_er = 0;

                    if (s2 == 2) {
                      limse2n = 2;
                    } else if (s2 == 3) {
                      limse2n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else if (limmins3 <= daynu && daynu <= limmaxs3) {
                  if (s3 < limse3c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    s++;
                    i++;
                    s3++;
                    cantcor++;
                    cantfdc++;
                    cantfd++;
                    pos_er = 0;

                    if (s3 == 2) {
                      limse3n = 2;
                    } else if (s3 == 3) {
                      limse3n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else {
                  if (s4 < limse4c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    s++;
                    i++;
                    s4++;
                    cantcor++;
                    cantfdc++;
                    cantfd++;
                    pos_er = 0;

                    if (s4 == 2) {
                      limse4n = 2;
                    } else if (s4 == 3) {
                      limse4n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                }
                // } else {
                //   events.pop();
                //   pos_er++;
                // }
              } else {
                events.pop();
                pos_er++;
              }
            } else {
              events.pop();
              pos_er++;
            }
          }
          if (
            dayst == "Mon" ||
            dayst == "Tue" ||
            dayst == "Wed" ||
            dayst == "Thu" ||
            dayst == "Fri"
          ) {
            if (h < limhc && canth < limh) {
              if (
                !asignadosco.includes(daynu) &&
                !asignadoscono.includes(daynu) &&
                !asignadosconopost.includes(daynu)
              ) {
                // if (
                //   (!asignadosco.includes(daynu + 1) || !asignadosco.includes(daynu - 1)) &&
                //   (!asignadosco.includes(daynu + 1) || !asignadosco.includes(daynu + 2)) &&
                //   (!asignadosco.includes(daynu - 1) || !asignadosco.includes(daynu - 2))
                // ) {
                //.............AUXILIARES..............
                if (limmins1 <= daynu && daynu <= limmaxs1) {
                  if (s1 < limse1c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    h++;
                    i++;
                    s1++;
                    cantcor++;
                    canth++;
                    pos_er = 0;
                    if (s1 == 2) {
                      limse1n = 2;
                    } else if (s1 == 3) {
                      limse1n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else if (limmins2 <= daynu && daynu <= limmaxs2) {
                  if (s2 < limse2c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    h++;
                    i++;
                    s2++;
                    cantcor++;
                    canth++;
                    pos_er = 0;
                    if (s2 == 2) {
                      limse2n = 2;
                    } else if (s2 == 3) {
                      limse2n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else if (limmins3 <= daynu && daynu <= limmaxs3) {
                  if (s3 < limse3c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    h++;
                    i++;
                    s3++;
                    cantcor++;
                    canth++;
                    pos_er = 0;
                    if (s3 == 2) {
                      limse3n = 2;
                    } else if (s3 == 3) {
                      limse3n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else {
                  if (s4 < limse4c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    h++;
                    i++;
                    s4++;
                    cantcor++;
                    canth++;
                    pos_er = 0;
                    if (s4 == 2) {
                      limse4n = 2;
                    } else if (s4 == 3) {
                      limse4n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                }
                // } else {
                //   events.pop();
                //   pos_er++;
                // }
              } else {
                events.pop();
                pos_er++;
              }
            } else {
              events.pop();
              pos_er++;
            }
          }
        } else {
          pos_er++;
        }

        n += 1;
        if (cantcor == 8) {
          limhn = 7;
        } else if (cantcor == 9) {
          limhn = 6;
        } else if (cantcor == 10) {
          limhn = 5;
        } else if (cantcor == 11) {
          limhn = 4;
        } else if (cantcor == 12) {
          limhn = 3;
        }
      }

      //....................................................................NOCHES........................................................................
      if (cantnoc < limnoc) {
        if (nno == shuffle_noches_prev.length) {
          nno = 0;
        }
        daystno = shuffle_noches_prev[nno].dia;
        daynoc = shuffle_noches_prev[nno].dianum;

        if (cant_cwfno == 1) {
          cant_fpcno = 2;
        }

        if (shuffle_noches_prev[nno].contador < cant_fpcno) {
          events.push({
            id: `${res[index].idFuncionarios}`,
            cedula: `${res[index].Cedula}`,
            tipocontrato: `${res[index].TipoContrato}`,
            cargo: `${res[index].TipoCargo}`,
            name: `${res[index].Nombre} ${res[index].Apellido}`,
            start: `${shuffle_noches_prev[nno].fecha} ${res2[1].HoraInicio}`,
            end: `${shuffle_noches[nno].fecha} ${res2[1].HoraFin}`,
            details1: `${res[index].AreaOServicio}`,
            details2: `${res[index].CentroDeCosto}`,
            color: "light-blue darken-4",
            idTipoTurno: "2",
          });

          if (daystno == "Sun") {
            if (d < limdn && cantfdn < limfdn && cantfd < limfd) {
              if (
                !asignadosco.includes(daynoc) &&
                !asignadosco.includes(daynoc + 1) &&
                !asignadoscono.includes(daynoc) &&
                !asignadoscono.includes(daynoc + 1) &&
                !asignadoscono.includes(daynoc - 1)
              ) {
                //.............AUXILIARES..............
                if (limmins1 <= daynoc && daynoc <= limmaxs1) {
                  if (s1no < limse1n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    dno++;
                    ino++;
                    s1no++;
                    cantnoc++;
                    cantfdn++;
                    cantfd++;
                    pos_er_no = 0;

                    if (s1no == 2) {
                      limse1c = 2;
                    } else if (s1no == 3) {
                      limse1c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                } else if (limmins2 <= daynoc && daynoc <= limmaxs2) {
                  if (s2no < limse2n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    dno++;
                    ino++;
                    s2no++;
                    cantnoc++;
                    cantfdn++;
                    cantfd++;
                    pos_er_no = 0;

                    if (s2no == 2) {
                      limse2c = 2;
                    } else if (s2no == 3) {
                      limse2c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                } else if (limmins3 <= daynoc && daynoc <= limmaxs3) {
                  if (s3no < limse3n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    dno++;
                    ino++;
                    s3no++;
                    cantnoc++;
                    cantfdn++;
                    cantfd++;
                    pos_er_no = 0;

                    if (s3no == 2) {
                      limse3c = 2;
                    } else if (s3no == 3) {
                      limse3c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                } else {
                  if (s4no < limse4n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    dno++;
                    ino++;
                    s4no++;
                    cantnoc++;
                    cantfdn++;
                    cantfd++;
                    pos_er_no = 0;

                    if (s4no == 2) {
                      limse4c = 2;
                    } else if (s4no == 3) {
                      limse4c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                }
              } else {
                events.pop();
                pos_er_no++;
              }
            } else {
              events.pop();
              pos_er_no++;
            }
          }
          if (daystno == "Sat") {
            if (sno < limsn && cantfdn < limfdn && cantfd < limfd) {
              if (
                !asignadosco.includes(daynoc) &&
                !asignadosco.includes(daynoc + 1) &&
                !asignadoscono.includes(daynoc) &&
                !asignadoscono.includes(daynoc + 1) &&
                !asignadoscono.includes(daynoc - 1)
              ) {
                //.............AUXILIARES..............
                if (limmins1 <= daynoc && daynoc <= limmaxs1) {
                  if (s1no < limse1n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    sno++;
                    ino++;
                    s1no++;
                    cantnoc++;
                    cantfdn++;
                    cantfd++;
                    pos_er_no = 0;

                    if (s1no == 2) {
                      limse1c = 2;
                    } else if (s1no == 3) {
                      limse1c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                } else if (limmins2 <= daynoc && daynoc <= limmaxs2) {
                  if (s2no < limse2n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    sno++;
                    ino++;
                    s2no++;
                    cantnoc++;
                    cantfdn++;
                    cantfd++;
                    pos_er_no = 0;

                    if (s2no == 2) {
                      limse2c = 2;
                    } else if (s2no == 3) {
                      limse2c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                } else if (limmins3 <= daynoc && daynoc <= limmaxs3) {
                  if (s3no < limse3n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    sno++;
                    ino++;
                    s3no++;
                    cantnoc++;
                    cantfdn++;
                    cantfd++;
                    pos_er_no = 0;

                    if (s3no == 2) {
                      limse3c = 2;
                    } else if (s3no == 3) {
                      limse3c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                } else {
                  if (s4no < limse4n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    sno++;
                    ino++;
                    s4no++;
                    cantnoc++;
                    cantfdn++;
                    cantfd++;
                    pos_er_no = 0;

                    if (s4no == 2) {
                      limse4c = 2;
                    } else if (s4no == 3) {
                      limse4c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                }
              } else {
                events.pop();
                pos_er_no++;
              }
            } else {
              events.pop();
              pos_er_no++;
            }
          }
          if (
            daystno == "Mon" ||
            daystno == "Tue" ||
            daystno == "Wed" ||
            daystno == "Thu" ||
            daystno == "Fri"
          ) {
            if (hno < limhn && canth < limh) {
              if (
                !asignadosco.includes(daynoc) &&
                !asignadosco.includes(daynoc + 1) &&
                !asignadoscono.includes(daynoc) &&
                !asignadoscono.includes(daynoc + 1) &&
                !asignadoscono.includes(daynoc - 1)
              ) {
                //.............AUXILIARES..............
                if (limmins1 <= daynoc && daynoc <= limmaxs1) {
                  if (s1no < limse1n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    hno++;
                    ino++;
                    s1no++;
                    cantnoc++;
                    canth++;
                    pos_er_no = 0;
                    if (s1no == 2) {
                      limse1c = 2;
                    } else if (s1no == 3) {
                      limse1c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                } else if (limmins2 <= daynoc && daynoc <= limmaxs2) {
                  if (s2no < limse2n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    hno++;
                    ino++;
                    s2no++;
                    cantnoc++;
                    canth++;
                    pos_er_no = 0;
                    if (s2no == 2) {
                      limse2c = 2;
                    } else if (s2no == 3) {
                      limse2c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                } else if (limmins3 <= daynoc && daynoc <= limmaxs3) {
                  if (s3no < limse3n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    hno++;
                    ino++;
                    s3no++;
                    cantnoc++;
                    canth++;
                    pos_er_no = 0;
                    if (s3no == 2) {
                      limse3c = 2;
                    } else if (s3no == 3) {
                      limse3c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                } else {
                  if (s4no < limse4n) {
                    asignadoscono.push(daynoc);
                    asignadosconopost.push(daynoc + 1);
                    shuffle_noches_prev[nno].contador += 1;
                    hno++;
                    ino++;
                    s4no++;
                    cantnoc++;
                    canth++;
                    pos_er_no = 0;
                    if (s4no == 2) {
                      limse4c = 2;
                    } else if (s4no == 3) {
                      limse4c = 1;
                    }
                    if (shuffle_noches_prev[nno].contador == 3) {
                      cant_cwfno++;
                    }
                  } else {
                    events.pop();
                    pos_er_no++;
                  }
                }
              } else {
                events.pop();
                pos_er_no++;
              }
            } else {
              events.pop();
              pos_er_no++;
            }
          }
        } else {
          pos_er_no++;
        }

        nno += 1;

        if (cantnoc == 8) {
          limhc = 7;
        }
      }

      //.........................................................FIN NOCHES.................................................................

      if (pos_er == 30 || pos_er_no == 30) {
        events = [];
        swit = 1;
        ercont++;
        pos_er = 0;
        n = 0;
        i = 0;
        s1 = 0;
        s2 = 0;
        s3 = 0;
        s4 = 0;
        d = 0;
        s = 0;
        h = 0;
        je = 0;
        dayst = "";
        daynu = 0;
        cantcor = 0;
        cantfdc = 0;
        asignadosco = [];
        cant_cwf = 0;
        cant_fpc = 4;
        rep_unco1 = 0;
        rep_unco2 = 0;
        rep_unco3 = 0;
        rep_unco4 = 0;

        shuffle_corridos = shuffle(shuffle_corridos);
        for (let p = 0; p < shuffle_corridos.length; p++) {
          shuffle_corridos[p].contador = 0;
          shuffle_corridos[p].cont_jefes = 0;
        }

        ercontno++;
        pos_er_no = 0;
        nno = 0;
        ino = 0;
        s1no = 0;
        s2no = 0;
        s3no = 0;
        s4no = 0;
        dno = 0;
        sno = 0;
        hno = 0;
        jeno = 0;
        daystno = "";
        daynoc = 0;
        cantnoc = 0;
        cantfdn = 0;
        asignadoscono = [];
        asignadosconopost = [];
        cant_cwfno = 0;
        cant_fpcno = 3;
        rep_uncono1 = 0;
        rep_uncono2 = 0;
        rep_uncono3 = 0;
        rep_uncono4 = 0;

        shuffle_noches = [];
        shuffle_noches_prev = shuffle(shuffle_noches_prev);
        for (let p = 0; p < shuffle_noches_prev.length; p++) {
          shuffle_noches_prev[p].contador = 0;
          shuffle_noches_prev[p].cont_jefes = 0;
        }
        for (let i = 0; i < turnos_noches_prev.length; i++) {
          let spl = turnos_noches_prev[i].fecha.split("-");
          let splpop = spl.pop();
          let splpop_mes = spl.pop();

          if (
            splpop_mes == 1 ||
            splpop_mes == 3 ||
            splpop_mes == 5 ||
            splpop_mes == 7 ||
            splpop_mes == 8 ||
            splpop_mes == 10 ||
            splpop_mes == 11
          ) {
            if (parseInt(splpop) == 31) {
              num = 1;
            } else {
              num = parseInt(splpop) + 1;
            }
          } else if (
            splpop_mes == 4 ||
            splpop_mes == 6 ||
            splpop_mes == 9 ||
            splpop_mes == 11
          ) {
            if (parseInt(splpop) == 30) {
              num = 1;
            } else {
              num = parseInt(splpop) + 1;
            }
          } else {
            if (parseInt(splpop) == 28) {
              num = 1;
            } else {
              num = parseInt(splpop) + 1;
            }
          }

          if (num == 1) {
            mes = parseInt(splpop_mes) + 1;
            let numstringmes = mes.toString();
            if (numstringmes.length === 1) {
              numstringmes = `0${numstringmes}`;
            }
          } else {
            mes = parseInt(splpop_mes);
            let numstringmes = mes.toString();
            if (numstringmes.length === 1) {
              numstringmes = `0${numstringmes}`;
            }
          }
          let numstring = num.toString();
          let numstringmes = mes.toString();
          if (numstring.length === 1) {
            numstring = `0${numstring}`;
          }
          if (numstringmes.length === 1) {
            numstringmes = `0${numstringmes}`;
          }
          spl.push(numstringmes);
          spl.push(numstring);

          shuffle_noches.push({
            fecha: spl.join("-"),
          });
        }

        break;
      }
      // if (events.length > (res.length - 10) * 16) {
      //   break;
      // }
    }
    // if (events.length > (res.length - 10) * 16) {
    //   console.log(`Eventos: ${events.length} - Reinicios: ${ercont}`);
    //   break;
    // }
  }

  let funcionarios = [];
  let nombre = "";
  let registros = [];
  let count = 0;
  for (let i = 0; i < events.length; i++) {
    nombre = events[i].name;
    if (!registros.includes(nombre)) {
      registros.push(nombre);
      funcionarios.push({
        id: events[i].id,
        name: events[i].name,
        horarios: [],
      });
      events.forEach((element) => {
        if (element.name == funcionarios[count].name) {
          funcionarios[count].horarios.push({
            id: `${element.id}`,
            cedula: `${element.cedula}`,
            tipocontrato: `${element.tipocontrato}`,
            cargo: `${element.cargo}`,
            name: `${element.name}`,
            details1: `${element.details1}`,
            details2: `${element.details2}`,
            start: `${element.start}`,
            end: `${element.end}`,
            color: `${element.color}`,
            idTipoTurno: `${element.idTipoTurno}`,
          });
        }
      });
      count++;
    }
  }

  let returnArray = [];
  returnArray.push(events);
  returnArray.push(funcionarios);
  return returnArray;
}

//Semana sobrante

function week(hp1, hp2, month) {
  const addDays = (date, days = 1) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };
  const dateRange = (start, end, range = []) => {
    if (start > end) return range;
    const next = addDays(start, 1);
    return dateRange(next, end, [...range, start]);
  };
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function findIndexInData(data, property, value) {
    var result = -1;
    data.some(function (item, i) {
      if (item[property] === value) {
        result = i;
        return true;
      }
    });
    return result;
  }

  let mesPick = month;
  let range2 = [];
  let lastday = null;
  if (mesPick == "05") {
    range2 = dateRange(new Date(`2021/05/31`), new Date(`2021/06/06`));
    lastday = 31;
  } else if (mesPick == "08") {
    range2 = dateRange(new Date(`2021/08/30`), new Date(`2021/09/05`));
    lastday = 31;
  } else if (mesPick == "03") {
    range2 = dateRange(new Date(`2021/03/29`), new Date(`2021/04/04`));
    lastday = 31;
  }

  let meses = range2.map((date) => date.toString().slice(6, 7));
  let fechas2 = range2.map((date) => date.toString().slice(0, 3));
  let corridos2 = range2.map((date) => date.toISOString().slice(0, 10));
  let noches_prev2 = range2.map((date) => date.toISOString().slice(0, 10));
  let daynumber2 = range2.map((date) => date.toISOString().slice(8, 10));
  let jc2 = range2.map((date) => date.toISOString().slice(0, 10));
  let shuffle_noches = [];
  let daynumbertn2 = [];
  let num2 = 0;
  let mes2 = 0;

  for (let i = 0; i < daynumber2.length; i++) {
    daynumbertn2.push(parseInt(daynumber2[i]));
  }

  let turnos_corridos2 = [];
  let turnos_noches_prev2 = [];
  let funcs2 = [];
  let turnos_jc = [];

  for (let i = 0; i < fechas2.length; i++) {
    turnos_corridos2.push({
      dia: fechas2[i],
      fecha: corridos2[i],
      contador: 0,
      cont_jefes: 0,
      dianum: daynumbertn2[i],
    });
    turnos_noches_prev2.push({
      dia: fechas2[i],
      fecha: noches_prev2[i],
      contador: 0,
      cont_jefes: 0,
      dianum: daynumbertn2[i],
    });
    turnos_jc.push({
      dia: fechas2[i],
      fecha: jc2[i],
      dianum: daynumbertn2[i],
    });
  }

  let shuffle_corridos = shuffle(turnos_corridos2);
  let shuffle_noches_prev = shuffle(turnos_noches_prev2);

  for (let i = 0; i < turnos_noches_prev2.length; i++) {
    let spl = turnos_noches_prev2[i].fecha.split("-");
    let splpop = spl.pop();
    let splpop_mes = spl.pop();

    if (
      splpop_mes == 1 ||
      splpop_mes == 3 ||
      splpop_mes == 5 ||
      splpop_mes == 7 ||
      splpop_mes == 8 ||
      splpop_mes == 10 ||
      splpop_mes == 11
    ) {
      if (parseInt(splpop) == 31) {
        num2 = 1;
      } else {
        num2 = parseInt(splpop) + 1;
      }
    } else if (
      splpop_mes == 4 ||
      splpop_mes == 6 ||
      splpop_mes == 9 ||
      splpop_mes == 11
    ) {
      if (parseInt(splpop) == 30) {
        num2 = 1;
      } else {
        num2 = parseInt(splpop) + 1;
      }
    } else {
      if (parseInt(splpop) == 28) {
        num2 = 1;
      } else {
        num2 = parseInt(splpop) + 1;
      }
    }

    if (num2 == 1) {
      mes2 = parseInt(splpop_mes) + 1;
      let numstringmes = mes2.toString();
      if (numstringmes.length === 1) {
        numstringmes = `0${numstringmes}`;
      }
    } else {
      mes2 = parseInt(splpop_mes);
      let numstringmes = mes2.toString();
      if (numstringmes.length === 1) {
        numstringmes = `0${numstringmes}`;
      }
    }
    let numstring = num2.toString();
    let numstringmes = mes2.toString();
    if (numstring.length === 1) {
      numstring = `0${numstring}`;
    }
    if (numstringmes.length === 1) {
      numstringmes = `0${numstringmes}`;
    }
    spl.push(numstringmes);
    spl.push(numstring);

    shuffle_noches.push({
      fecha: spl.join("-"),
    });
  }

  //########################################################################################################################
  let res = shuffle(hp1);
  let res2 = hp2;
  let events = [];
  let swit = 0;
  let cantturnos = 4;

  let n = 0;
  let i = 0;
  let je = 0;
  let jefes = [];
  let ercont = 0;
  let cant_cwf = 0;
  let cant_fpc = 4;
  let rep_unco1 = 0;

  let nno = 0;
  let ino = 0;
  let jeno = 0;
  let jefesno = [];
  let ercontno = 0;
  let cant_cwfno = 0;
  let cant_fpcno = 2;
  let rep_uncono1 = 0;

  //#####################################################################
  let limh = 0;
  let limfd = 0;
  let limcor = 0;
  let limnoc = 0;
  let canth = 0;
  let cantfd = 0;
  let cantcor = 0;
  let limhn = 0;
  let canthc = 0;
  let canthn = 0;
  let limfdc = 0;
  let limfdn = 0;
  let cantfdc = 0;
  let cantfdn = 0;
  let limdc = 0;
  let limdn = 0;
  let cantdc = 0;
  let cantdn = 0;
  let limsc = 0;
  let limsn = 0;
  let cantsc = 0;
  let cantsn = 0;
  let limse1c = 0;
  let limse1n = 0;

  //#####################################################################

  let indexJc = findIndexInData(res, "idFuncionarios", 204);
  let funcjc = res.splice(indexJc, 1);

  res.unshift(funcjc[0]);

  //#####################################################################

  for (let index = 0; index < 10; index++) {
    if (swit == 1) {
      index = 0;
      swit = 0;
      je = res[index].idFuncionarios;
      jeno = res[index].idFuncionarios;
    }
    if (index == 0) {
      for (let index = 0; index < 1; index++) {
        let dayst = "";
        let daynu = 0;

        for (let i = 0; i < turnos_jc.length; i++) {
          dayst = turnos_jc[i].dia;
          daynu = turnos_jc[i].dianum;
          if (
            dayst == "Mon" ||
            dayst == "Tue" ||
            dayst == "Wed" ||
            dayst == "Thu" ||
            dayst == "Fri"
          ) {
            events.push({
              id: `${res[index].idFuncionarios}`,
              cedula: `${res[index].Cedula}`,
              tipocontrato: `${res[index].TipoContrato}`,
              cargo: `${res[index].TipoCargo}`,
              name: `${res[index].Nombre} ${res[index].Apellido}`,
              start: `${turnos_jc[i].fecha} ${res2[2].HoraInicio}`,
              end: `${turnos_jc[i].fecha} ${res2[2].HoraFin}`,
              details1: `${res[index].AreaOServicio}`,
              details2: `${res[index].CentroDeCosto}`,
              color: "#9a67ea",
              idTipoTurno: "3",
            });
          }
        }
      }
      index = 1;
    }

    je = res[index].idFuncionarios;
    i = 0;
    let pos_er = 0;
    let s1 = 0;
    let s2 = 0;
    let s3 = 0;
    let s4 = 0;
    let d = 0;
    let s = 0;
    let h = 0;
    let dayst = "";
    let daynu = 0;
    let daynu1 = 0;
    let daynu2 = 0;
    let daynu3 = 0;
    let daynu4 = 0;
    let asignadosco = [];

    jeno = res[index].idFuncionarios;
    ino = 0;
    let pos_er_no = 0;
    let s1no = 0;
    let s2no = 0;
    let s3no = 0;
    let s4no = 0;
    let dno = 0;
    let sno = 0;
    let hno = 0;
    let daystno = "";
    let daynoc = 0;
    let daynoc1 = 0;
    let daynoc2 = 0;
    let asignadoscono = [];
    let asignadosconopost = [];

    let asignadosrep = [];

    if (swit == 1) {
      index = 1;
      swit = 0;
      je = res[index].idFuncionarios;
      jeno = res[index].idFuncionarios;
    }

    if (res[index].Contrato == 1) {
      cantturnos = 4;
    } else {
      cantturnos = 2;
    }
    //###################################################################
    let limh = 4;
    let limfd = 2;
    let limcor = 3;
    let limnoc = 3;

    let canth = 0;
    let cantfd = 0;
    let cantcor = 0;
    let cantnoc = 0;

    let limhc = 3;
    let limhn = 3;

    let limfdc = 2;
    let limfdn = 2;

    let cantfdc = 0;
    let cantfdn = 0;

    //##################################################################

    let limdc = 1;
    let limdn = 1;

    let limsc = 1;
    let limsn = 1;

    if (res[index].Contrato == 1) {
      limse1c = 3; //Min: 1
      limse1n = 3; //Min: 1
    } else {
      limse1c = 1; //Min: 1
      limse1n = 1; //Min: 1
    }

    //###################################################################
    while (i + ino < cantturnos) {
      if (cantcor < limcor) {
        if (n == shuffle_corridos.length) {
          n = 0;
        }

        dayst = shuffle_corridos[n].dia;
        daynu = shuffle_corridos[n].dianum;
        daynu1 = daynu + 1;
        daynu2 = daynu - 1;
        daynu3 = daynu + 2;
        daynu4 = daynu - 2;

        if (daynu == lastday) {
          daynu1 = 1;
          daynu3 = 2;
        }
        if (daynu == 1) {
          daynu2 = lastday;
          daynu4 = lastday - 1;
        }
        if (daynu == lastday - 1) {
          daynu3 = 1;
        }
        if (daynu == 2) {
          daynu4 = lastday;
        }

        if (cant_cwf == 1) {
          cant_fpc = 3;
        }

        if (shuffle_corridos[n].contador < cant_fpc) {
          events.push({
            id: `${res[index].idFuncionarios}`,
            cedula: `${res[index].Cedula}`,
            tipocontrato: `${res[index].TipoContrato}`,
            cargo: `${res[index].TipoCargo}`,
            name: `${res[index].Nombre} ${res[index].Apellido}`,
            start: `${shuffle_corridos[n].fecha} ${res2[0].HoraInicio}`,
            end: `${shuffle_corridos[n].fecha} ${res2[0].HoraFin}`,
            details1: `${res[index].AreaOServicio}`,
            details2: `${res[index].CentroDeCosto}`,
            color: "green",
            idTipoTurno: "1",
          });

          if (dayst == "Sun") {
            if (d < limdc) {
              if (
                !asignadosco.includes(daynu) &&
                !asignadoscono.includes(daynu) &&
                !asignadosconopost.includes(daynu)
              ) {
                if (
                  (!asignadosco.includes(daynu1) ||
                    !asignadosco.includes(daynu2)) &&
                  (!asignadosco.includes(daynu1) ||
                    !asignadosco.includes(daynu3)) &&
                  (!asignadosco.includes(daynu2) ||
                    !asignadosco.includes(daynu4))
                ) {
                  if (s1 < limse1c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    d++;
                    i++;
                    s1++;
                    cantcor++;
                    cantfdc++;
                    cantfd++;
                    pos_er = 0;
                    if (s1 == 2) {
                      limse1n = 2;
                    } else if (s1 == 3) {
                      limse1n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else {
                  events.pop();
                  pos_er++;
                }
              } else {
                events.pop();
                pos_er++;
              }
            } else {
              events.pop();
              pos_er++;
            }
          }
          if (dayst == "Sat") {
            if (s < limsc) {
              if (
                !asignadosco.includes(daynu) &&
                !asignadoscono.includes(daynu) &&
                !asignadosconopost.includes(daynu)
              ) {
                if (
                  (!asignadosco.includes(daynu1) ||
                    !asignadosco.includes(daynu2)) &&
                  (!asignadosco.includes(daynu1) ||
                    !asignadosco.includes(daynu3)) &&
                  (!asignadosco.includes(daynu2) ||
                    !asignadosco.includes(daynu4))
                ) {
                  if (s1 < limse1c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    s++;
                    i++;
                    s1++;
                    cantcor++;
                    cantfdc++;
                    cantfd++;
                    pos_er = 0;

                    if (s1 == 2) {
                      limse1n = 2;
                    } else if (s1 == 3) {
                      limse1n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else {
                  events.pop();
                  pos_er++;
                }
              } else {
                events.pop();
                pos_er++;
              }
            } else {
              events.pop();
              pos_er++;
            }
          }
          if (
            dayst == "Mon" ||
            dayst == "Tue" ||
            dayst == "Wed" ||
            dayst == "Thu" ||
            dayst == "Fri"
          ) {
            if (h < limhc && canth < limh) {
              if (
                !asignadosco.includes(daynu) &&
                !asignadoscono.includes(daynu) &&
                !asignadosconopost.includes(daynu)
              ) {
                if (
                  (!asignadosco.includes(daynu1) ||
                    !asignadosco.includes(daynu2)) &&
                  (!asignadosco.includes(daynu1) ||
                    !asignadosco.includes(daynu3)) &&
                  (!asignadosco.includes(daynu2) ||
                    !asignadosco.includes(daynu4))
                ) {
                  if (s1 < limse1c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    h++;
                    i++;
                    s1++;
                    cantcor++;
                    canth++;
                    pos_er = 0;
                    if (s1 == 2) {
                      limse1n = 2;
                    } else if (s1 == 3) {
                      limse1n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else {
                  events.pop();
                  pos_er++;
                }
              } else {
                events.pop();
                pos_er++;
              }
            } else {
              events.pop();
              pos_er++;
            }
          }
        } else {
          pos_er++;
        }

        n += 1;
      }

      //....................................................................NOCHES........................................................................
      if (cantnoc < limnoc) {
        if (nno == shuffle_noches_prev.length) {
          nno = 0;
        }
        daystno = shuffle_noches_prev[nno].dia;
        daynoc = shuffle_noches_prev[nno].dianum;
        daynoc1 = daynoc + 1;
        daynoc2 = daynoc - 1;
        if (daynoc == lastday) {
          daynoc1 = 1;
        }
        if (daynoc == 1) {
          daynoc2 = lastday;
        }

        if (shuffle_noches_prev[nno].contador < 2) {
          events.push({
            id: `${res[index].idFuncionarios}`,
            cedula: `${res[index].Cedula}`,
            tipocontrato: `${res[index].TipoContrato}`,
            cargo: `${res[index].TipoCargo}`,
            name: `${res[index].Nombre} ${res[index].Apellido}`,
            start: `${shuffle_noches_prev[nno].fecha} ${res2[1].HoraInicio}`,
            end: `${shuffle_noches[nno].fecha} ${res2[1].HoraFin}`,
            details1: `${res[index].AreaOServicio}`,
            details2: `${res[index].CentroDeCosto}`,
            color: "light-blue darken-4",
            idTipoTurno: "2",
          });

          if (daystno == "Sun") {
            if (d < limdn) {
              if (
                !asignadosco.includes(daynoc) &&
                !asignadosco.includes(daynoc1) &&
                !asignadoscono.includes(daynoc) &&
                !asignadoscono.includes(daynoc1) &&
                !asignadoscono.includes(daynoc2)
              ) {
                //.............AUXILIARES..............

                if (s1no < limse1n) {
                  asignadoscono.push(daynoc);
                  asignadosconopost.push(daynoc1);
                  shuffle_noches_prev[nno].contador += 1;
                  dno++;
                  ino++;
                  s1no++;
                  cantnoc++;
                  cantfdn++;
                  cantfd++;
                  pos_er_no = 0;

                  if (s1no == 2) {
                    limse1c = 2;
                  } else if (s1no == 3) {
                    limse1c = 1;
                  }
                } else {
                  events.pop();
                  pos_er_no++;
                }
              } else {
                events.pop();
                pos_er_no++;
              }
            } else {
              events.pop();
              pos_er_no++;
            }
          }
          if (daystno == "Sat") {
            if (sno < limsn && cantfdn < limfdn && cantfd < limfd) {
              if (
                !asignadosco.includes(daynoc) &&
                !asignadosco.includes(daynoc1) &&
                !asignadoscono.includes(daynoc) &&
                !asignadoscono.includes(daynoc1) &&
                !asignadoscono.includes(daynoc2)
              ) {
                //.............AUXILIARES..............

                if (s1no < limse1n) {
                  asignadoscono.push(daynoc);
                  asignadosconopost.push(daynoc1);
                  shuffle_noches_prev[nno].contador += 1;
                  sno++;
                  ino++;
                  s1no++;
                  cantnoc++;
                  cantfdn++;
                  cantfd++;
                  pos_er_no = 0;

                  if (s1no == 2) {
                    limse1c = 2;
                  } else if (s1no == 3) {
                    limse1c = 1;
                  }
                } else {
                  events.pop();
                  pos_er_no++;
                }
              } else {
                events.pop();
                pos_er_no++;
              }
            } else {
              events.pop();
              pos_er_no++;
            }
          }
          if (
            daystno == "Mon" ||
            daystno == "Tue" ||
            daystno == "Wed" ||
            daystno == "Thu" ||
            daystno == "Fri"
          ) {
            if (hno < limhn) {
              if (
                !asignadosco.includes(daynoc) &&
                !asignadosco.includes(daynoc1) &&
                !asignadoscono.includes(daynoc) &&
                !asignadoscono.includes(daynoc1) &&
                !asignadoscono.includes(daynoc2)
              ) {
                //.............AUXILIARES..............

                if (s1no < limse1n) {
                  asignadoscono.push(daynoc);
                  asignadosconopost.push(daynoc1);
                  shuffle_noches_prev[nno].contador += 1;
                  hno++;
                  ino++;
                  s1no++;
                  cantnoc++;
                  canth++;
                  pos_er_no = 0;
                  if (s1no == 2) {
                    limse1c = 2;
                  } else if (s1no == 3) {
                    limse1c = 1;
                  }
                } else {
                  events.pop();
                  pos_er_no++;
                }
              } else {
                events.pop();
                pos_er_no++;
              }
            } else {
              events.pop();
              pos_er_no++;
            }
          }
        } else {
          pos_er_no++;
        }

        nno += 1;
      }

      //.........................................................FIN NOCHES.................................................................

      if (pos_er == 9 || pos_er_no == 9) {
        events = [];
        swit = 1;
        ercont++;
        pos_er = 0;
        n = 0;
        i = 0;
        s1 = 0;
        s2 = 0;
        s3 = 0;
        s4 = 0;
        d = 0;
        s = 0;
        h = 0;
        je = 0;
        dayst = "";
        daynu = 0;
        cantcor = 0;
        cantfdc = 0;
        asignadosco = [];
        cant_cwf = 0;
        cant_fpc = 4;

        shuffle_corridos = shuffle(shuffle_corridos);
        for (let p = 0; p < shuffle_corridos.length; p++) {
          shuffle_corridos[p].contador = 0;
          shuffle_corridos[p].cont_jefes = 0;
        }

        ercontno++;
        pos_er_no = 0;
        nno = 0;
        ino = 0;
        s1no = 0;
        s2no = 0;
        s3no = 0;
        s4no = 0;
        dno = 0;
        sno = 0;
        hno = 0;
        jeno = 0;
        daystno = "";
        daynoc = 0;
        cantnoc = 0;
        cantfdn = 0;
        asignadoscono = [];
        asignadosconopost = [];
        cant_cwfno = 0;
        cant_fpcno = 2;

        shuffle_noches = [];
        shuffle_noches_prev = shuffle(shuffle_noches_prev);
        for (let p = 0; p < shuffle_noches_prev.length; p++) {
          shuffle_noches_prev[p].contador = 0;
          shuffle_noches_prev[p].cont_jefes = 0;
        }
        for (let i = 0; i < turnos_noches_prev2.length; i++) {
          let spl = turnos_noches_prev2[i].fecha.split("-");
          let splpop = spl.pop();
          let splpop_mes = spl.pop();

          if (
            splpop_mes == 1 ||
            splpop_mes == 3 ||
            splpop_mes == 5 ||
            splpop_mes == 7 ||
            splpop_mes == 8 ||
            splpop_mes == 10 ||
            splpop_mes == 11
          ) {
            if (parseInt(splpop) == 31) {
              num2 = 1;
            } else {
              num2 = parseInt(splpop) + 1;
            }
          } else if (
            splpop_mes == 4 ||
            splpop_mes == 6 ||
            splpop_mes == 9 ||
            splpop_mes == 11
          ) {
            if (parseInt(splpop) == 30) {
              num2 = 1;
            } else {
              num2 = parseInt(splpop) + 1;
            }
          } else {
            if (parseInt(splpop) == 28) {
              num2 = 1;
            } else {
              num2 = parseInt(splpop) + 1;
            }
          }

          if (num2 == 1) {
            mes2 = parseInt(splpop_mes) + 1;
            let numstringmes = mes2.toString();
            if (numstringmes.length === 1) {
              numstringmes = `0${numstringmes}`;
            }
          } else {
            mes2 = parseInt(splpop_mes);
            let numstringmes = mes2.toString();
            if (numstringmes.length === 1) {
              numstringmes = `0${numstringmes}`;
            }
          }
          let numstring = num2.toString();
          let numstringmes = mes2.toString();
          if (numstring.length === 1) {
            numstring = `0${numstring}`;
          }
          if (numstringmes.length === 1) {
            numstringmes = `0${numstringmes}`;
          }
          spl.push(numstringmes);
          spl.push(numstring);

          shuffle_noches.push({
            fecha: spl.join("-"),
          });
        }
        break;
      }
    }
  }

  let funcionarios = [];
  let nombre = "";
  let registros = [];
  let count = 0;
  for (let i = 0; i < events.length; i++) {
    nombre = events[i].name;
    if (!registros.includes(nombre)) {
      registros.push(nombre);
      funcionarios.push({
        id: events[i].id,
        name: events[i].name,
        horarios: [],
      });
      events.forEach((element) => {
        if (element.name == funcionarios[count].name) {
          funcionarios[count].horarios.push({
            id: `${element.id}`,
            cedula: `${element.cedula}`,
            tipocontrato: `${element.tipocontrato}`,
            cargo: `${element.cargo}`,
            name: `${element.name}`,
            details1: `${element.details1}`,
            details2: `${element.details2}`,
            start: `${element.start}`,
            end: `${element.end}`,
            color: `${element.color}`,
            idTipoTurno: `${element.idTipoTurno}`,
          });
        }
      });
      count++;
    }
  }

  let returnArray = [];
  returnArray.push(events);
  returnArray.push(funcionarios);
  return returnArray;
}

//Semana sobrante 2

function weekextra(hp1, hp2, month) {
  const addDays = (date, days = 1) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };
  const dateRange = (start, end, range = []) => {
    if (start > end) return range;
    const next = addDays(start, 1);
    return dateRange(next, end, [...range, start]);
  };
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  let mesPick = month;
  let range2 = [];
  let lastday = null;
  if (mesPick == "05") {
    range2 = dateRange(new Date(`2021/05/31`), new Date(`2021/06/06`));
    lastday = 31;
  } else if (mesPick == "08") {
    range2 = dateRange(new Date(`2021/08/30`), new Date(`2021/09/05`));
    lastday = 31;
  } else if (mesPick == "03") {
    range2 = dateRange(new Date(`2021/03/29`), new Date(`2021/04/04`));
    lastday = 31;
  }

  let meses = range2.map((date) => date.toString().slice(6, 7));
  let fechas2 = range2.map((date) => date.toString().slice(0, 3));
  let corridos2 = range2.map((date) => date.toISOString().slice(0, 10));
  let noches_prev2 = range2.map((date) => date.toISOString().slice(0, 10));
  let daynumber2 = range2.map((date) => date.toISOString().slice(8, 10));
  let jc2 = range2.map((date) => date.toISOString().slice(0, 10));
  let shuffle_noches = [];
  let daynumbertn2 = [];
  let num2 = 0;
  let mes2 = 0;

  for (let i = 0; i < daynumber2.length; i++) {
    daynumbertn2.push(parseInt(daynumber2[i]));
  }

  let turnos_corridos2 = [];
  let turnos_noches_prev2 = [];
  let funcs2 = [];
  let turnos_jc = [];

  for (let i = 0; i < fechas2.length; i++) {
    turnos_corridos2.push({
      dia: fechas2[i],
      fecha: corridos2[i],
      contador: 0,
      cont_jefes: 0,
      dianum: daynumbertn2[i],
    });
    turnos_noches_prev2.push({
      dia: fechas2[i],
      fecha: noches_prev2[i],
      contador: 0,
      cont_jefes: 0,
      dianum: daynumbertn2[i],
    });
    turnos_jc.push({
      dia: fechas2[i],
      fecha: jc2[i],
      dianum: daynumbertn2[i],
    });
  }

  let shuffle_corridos = shuffle(turnos_corridos2);
  let shuffle_noches_prev = shuffle(turnos_noches_prev2);

  for (let i = 0; i < turnos_noches_prev2.length; i++) {
    let spl = turnos_noches_prev2[i].fecha.split("-");
    let splpop = spl.pop();
    let splpop_mes = spl.pop();

    if (
      splpop_mes == 1 ||
      splpop_mes == 3 ||
      splpop_mes == 5 ||
      splpop_mes == 7 ||
      splpop_mes == 8 ||
      splpop_mes == 10 ||
      splpop_mes == 11
    ) {
      if (parseInt(splpop) == 31) {
        num2 = 1;
      } else {
        num2 = parseInt(splpop) + 1;
      }
    } else if (
      splpop_mes == 4 ||
      splpop_mes == 6 ||
      splpop_mes == 9 ||
      splpop_mes == 11
    ) {
      if (parseInt(splpop) == 30) {
        num2 = 1;
      } else {
        num2 = parseInt(splpop) + 1;
      }
    } else {
      if (parseInt(splpop) == 28) {
        num2 = 1;
      } else {
        num2 = parseInt(splpop) + 1;
      }
    }

    if (num2 == 1) {
      mes2 = parseInt(splpop_mes) + 1;
      let numstringmes = mes2.toString();
      if (numstringmes.length === 1) {
        numstringmes = `0${numstringmes}`;
      }
    } else {
      mes2 = parseInt(splpop_mes);
      let numstringmes = mes2.toString();
      if (numstringmes.length === 1) {
        numstringmes = `0${numstringmes}`;
      }
    }
    let numstring = num2.toString();
    let numstringmes = mes2.toString();
    if (numstring.length === 1) {
      numstring = `0${numstring}`;
    }
    if (numstringmes.length === 1) {
      numstringmes = `0${numstringmes}`;
    }
    spl.push(numstringmes);
    spl.push(numstring);

    shuffle_noches.push({
      fecha: spl.join("-"),
    });
  }

  //########################################################################################################################
  let res = hp1;
  let res2 = hp2;
  let events = [];
  let swit = 0;
  let cantturnos = 4;

  let n = 0;
  let i = 0;
  let je = 0;
  let jefes = [];
  let ercont = 0;
  let cant_cwf = 0;
  let cant_fpc = 4;
  let rep_unco1 = 0;

  let nno = 0;
  let ino = 0;
  let jeno = 0;
  let jefesno = [];
  let ercontno = 0;
  let cant_cwfno = 0;
  let cant_fpcno = 2;
  let rep_uncono1 = 0;

  //#####################################################################
  let limh = 0;
  let limfd = 0;
  let limcor = 0;
  let limnoc = 0;
  let canth = 0;
  let cantfd = 0;
  let cantcor = 0;
  let limhn = 0;
  let canthc = 0;
  let canthn = 0;
  let limfdc = 0;
  let limfdn = 0;
  let cantfdc = 0;
  let cantfdn = 0;
  let limdc = 0;
  let limdn = 0;
  let cantdc = 0;
  let cantdn = 0;
  let limsc = 0;
  let limsn = 0;
  let cantsc = 0;
  let cantsn = 0;
  let limse1c = 0;
  let limse1n = 0;

  for (let index = 10; index < res.length; index++) {
    je = res[index].idFuncionarios;
    i = 0;
    let pos_er = 0;
    let s1 = 0;
    let s2 = 0;
    let s3 = 0;
    let s4 = 0;
    let d = 0;
    let s = 0;
    let h = 0;
    let dayst = "";
    let daynu = 0;
    let daynu1 = 0;
    let daynu2 = 0;
    let daynu3 = 0;
    let daynu4 = 0;
    let asignadosco = [];

    jeno = res[index].idFuncionarios;
    ino = 0;
    let pos_er_no = 0;
    let s1no = 0;
    let s2no = 0;
    let s3no = 0;
    let s4no = 0;
    let dno = 0;
    let sno = 0;
    let hno = 0;
    let daystno = "";
    let daynoc = 0;
    let daynoc1 = 0;
    let daynoc2 = 0;
    let asignadoscono = [];
    let asignadosconopost = [];

    let asignadosrep = [];

    if (swit == 1) {
      index = 10;
      swit = 0;
      je = res[index].idFuncionarios;
      jeno = res[index].idFuncionarios;
    }

    if (res[index].Contrato == 1) {
      cantturnos = 4;
    } else {
      cantturnos = 2;
    }
    //###################################################################
    let limh = 4;
    let limfd = 2;
    let limcor = 3;
    let limnoc = 3;

    let canth = 0;
    let cantfd = 0;
    let cantcor = 0;
    let cantnoc = 0;

    let limhc = 3;
    let limhn = 3;

    let limfdc = 2;
    let limfdn = 2;

    let cantfdc = 0;
    let cantfdn = 0;

    //##################################################################

    let limdc = 1;
    let limdn = 1;

    let limsc = 1;
    let limsn = 1;

    if (res[index].Contrato == 1) {
      limse1c = 3; //Min: 1
      limse1n = 3; //Min: 1
    } else {
      limse1c = 1; //Min: 1
      limse1n = 1; //Min: 1
    }

    //###################################################################
    while (i + ino < cantturnos) {
      if (cantcor < limcor) {
        if (n == shuffle_corridos.length) {
          n = 0;
        }

        dayst = shuffle_corridos[n].dia;
        daynu = shuffle_corridos[n].dianum;
        daynu1 = daynu + 1;
        daynu2 = daynu - 1;
        daynu3 = daynu + 2;
        daynu4 = daynu - 2;

        if (daynu == lastday) {
          daynu1 = 1;
          daynu3 = 2;
        }
        if (daynu == 1) {
          daynu2 = lastday;
          daynu4 = lastday - 1;
        }
        if (daynu == lastday - 1) {
          daynu3 = 1;
        }
        if (daynu == 2) {
          daynu4 = lastday;
        }

        if (cant_cwf == 1) {
          cant_fpc = 3;
        }

        if (shuffle_corridos[n].contador < cant_fpc) {
          events.push({
            id: `${res[index].idFuncionarios}`,
            cedula: `${res[index].Cedula}`,
            tipocontrato: `${res[index].TipoContrato}`,
            cargo: `${res[index].TipoCargo}`,
            name: `${res[index].Nombre} ${res[index].Apellido}`,
            start: `${shuffle_corridos[n].fecha} ${res2[0].HoraInicio}`,
            end: `${shuffle_corridos[n].fecha} ${res2[0].HoraFin}`,
            details1: `${res[index].AreaOServicio}`,
            details2: `${res[index].CentroDeCosto}`,
            color: "green",
            idTipoTurno: "1",
          });

          if (dayst == "Sun") {
            if (d < limdc) {
              if (
                !asignadosco.includes(daynu) &&
                !asignadoscono.includes(daynu) &&
                !asignadosconopost.includes(daynu)
              ) {
                if (
                  (!asignadosco.includes(daynu1) ||
                    !asignadosco.includes(daynu2)) &&
                  (!asignadosco.includes(daynu1) ||
                    !asignadosco.includes(daynu3)) &&
                  (!asignadosco.includes(daynu2) ||
                    !asignadosco.includes(daynu4))
                ) {
                  if (s1 < limse1c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    d++;
                    i++;
                    s1++;
                    cantcor++;
                    cantfdc++;
                    cantfd++;
                    pos_er = 0;
                    if (s1 == 2) {
                      limse1n = 2;
                    } else if (s1 == 3) {
                      limse1n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else {
                  events.pop();
                  pos_er++;
                }
              } else {
                events.pop();
                pos_er++;
              }
            } else {
              events.pop();
              pos_er++;
            }
          }
          if (dayst == "Sat") {
            if (s < limsc) {
              if (
                !asignadosco.includes(daynu) &&
                !asignadoscono.includes(daynu) &&
                !asignadosconopost.includes(daynu)
              ) {
                if (
                  (!asignadosco.includes(daynu1) ||
                    !asignadosco.includes(daynu2)) &&
                  (!asignadosco.includes(daynu1) ||
                    !asignadosco.includes(daynu3)) &&
                  (!asignadosco.includes(daynu2) ||
                    !asignadosco.includes(daynu4))
                ) {
                  if (s1 < limse1c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    s++;
                    i++;
                    s1++;
                    cantcor++;
                    cantfdc++;
                    cantfd++;
                    pos_er = 0;

                    if (s1 == 2) {
                      limse1n = 2;
                    } else if (s1 == 3) {
                      limse1n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else {
                  events.pop();
                  pos_er++;
                }
              } else {
                events.pop();
                pos_er++;
              }
            } else {
              events.pop();
              pos_er++;
            }
          }
          if (
            dayst == "Mon" ||
            dayst == "Tue" ||
            dayst == "Wed" ||
            dayst == "Thu" ||
            dayst == "Fri"
          ) {
            if (h < limhc && canth < limh) {
              if (
                !asignadosco.includes(daynu) &&
                !asignadoscono.includes(daynu) &&
                !asignadosconopost.includes(daynu)
              ) {
                if (
                  (!asignadosco.includes(daynu1) ||
                    !asignadosco.includes(daynu2)) &&
                  (!asignadosco.includes(daynu1) ||
                    !asignadosco.includes(daynu3)) &&
                  (!asignadosco.includes(daynu2) ||
                    !asignadosco.includes(daynu4))
                ) {
                  if (s1 < limse1c) {
                    asignadosco.push(daynu);
                    shuffle_corridos[n].contador += 1;
                    h++;
                    i++;
                    s1++;
                    cantcor++;
                    canth++;
                    pos_er = 0;
                    if (s1 == 2) {
                      limse1n = 2;
                    } else if (s1 == 3) {
                      limse1n = 1;
                    }
                    if (shuffle_corridos[n].contador == 4) {
                      cant_cwf++;
                    }
                  } else {
                    events.pop();
                    pos_er++;
                  }
                } else {
                  events.pop();
                  pos_er++;
                }
              } else {
                events.pop();
                pos_er++;
              }
            } else {
              events.pop();
              pos_er++;
            }
          }
        } else {
          pos_er++;
        }

        n += 1;
      }

      //....................................................................NOCHES........................................................................
      if (cantnoc < limnoc) {
        if (nno == shuffle_noches_prev.length) {
          nno = 0;
        }
        daystno = shuffle_noches_prev[nno].dia;
        daynoc = shuffle_noches_prev[nno].dianum;
        daynoc1 = daynoc + 1;
        daynoc2 = daynoc - 1;
        if (daynoc == lastday) {
          daynoc1 = 1;
        }
        if (daynoc == 1) {
          daynoc2 = lastday;
        }

        if (shuffle_noches_prev[nno].contador < 2) {
          events.push({
            id: `${res[index].idFuncionarios}`,
            cedula: `${res[index].Cedula}`,
            tipocontrato: `${res[index].TipoContrato}`,
            cargo: `${res[index].TipoCargo}`,
            name: `${res[index].Nombre} ${res[index].Apellido}`,
            start: `${shuffle_noches_prev[nno].fecha} ${res2[1].HoraInicio}`,
            end: `${shuffle_noches[nno].fecha} ${res2[1].HoraFin}`,
            details1: `${res[index].AreaOServicio}`,
            details2: `${res[index].CentroDeCosto}`,
            color: "light-blue darken-4",
            idTipoTurno: "2",
          });

          if (daystno == "Sun") {
            if (d < limdn) {
              if (
                !asignadosco.includes(daynoc) &&
                !asignadosco.includes(daynoc1) &&
                !asignadoscono.includes(daynoc) &&
                !asignadoscono.includes(daynoc1) &&
                !asignadoscono.includes(daynoc2)
              ) {
                //.............AUXILIARES..............

                if (s1no < limse1n) {
                  asignadoscono.push(daynoc);
                  asignadosconopost.push(daynoc1);
                  shuffle_noches_prev[nno].contador += 1;
                  dno++;
                  ino++;
                  s1no++;
                  cantnoc++;
                  cantfdn++;
                  cantfd++;
                  pos_er_no = 0;

                  if (s1no == 2) {
                    limse1c = 2;
                  } else if (s1no == 3) {
                    limse1c = 1;
                  }
                } else {
                  events.pop();
                  pos_er_no++;
                }
              } else {
                events.pop();
                pos_er_no++;
              }
            } else {
              events.pop();
              pos_er_no++;
            }
          }
          if (daystno == "Sat") {
            if (sno < limsn && cantfdn < limfdn && cantfd < limfd) {
              if (
                !asignadosco.includes(daynoc) &&
                !asignadosco.includes(daynoc1) &&
                !asignadoscono.includes(daynoc) &&
                !asignadoscono.includes(daynoc1) &&
                !asignadoscono.includes(daynoc2)
              ) {
                //.............AUXILIARES..............

                if (s1no < limse1n) {
                  asignadoscono.push(daynoc);
                  asignadosconopost.push(daynoc1);
                  shuffle_noches_prev[nno].contador += 1;
                  sno++;
                  ino++;
                  s1no++;
                  cantnoc++;
                  cantfdn++;
                  cantfd++;
                  pos_er_no = 0;

                  if (s1no == 2) {
                    limse1c = 2;
                  } else if (s1no == 3) {
                    limse1c = 1;
                  }
                } else {
                  events.pop();
                  pos_er_no++;
                }
              } else {
                events.pop();
                pos_er_no++;
              }
            } else {
              events.pop();
              pos_er_no++;
            }
          }
          if (
            daystno == "Mon" ||
            daystno == "Tue" ||
            daystno == "Wed" ||
            daystno == "Thu" ||
            daystno == "Fri"
          ) {
            if (hno < limhn) {
              if (
                !asignadosco.includes(daynoc) &&
                !asignadosco.includes(daynoc1) &&
                !asignadoscono.includes(daynoc) &&
                !asignadoscono.includes(daynoc1) &&
                !asignadoscono.includes(daynoc2)
              ) {
                //.............AUXILIARES..............

                if (s1no < limse1n) {
                  asignadoscono.push(daynoc);
                  asignadosconopost.push(daynoc1);
                  shuffle_noches_prev[nno].contador += 1;
                  hno++;
                  ino++;
                  s1no++;
                  cantnoc++;
                  canth++;
                  pos_er_no = 0;
                  if (s1no == 2) {
                    limse1c = 2;
                  } else if (s1no == 3) {
                    limse1c = 1;
                  }
                } else {
                  events.pop();
                  pos_er_no++;
                }
              } else {
                events.pop();
                pos_er_no++;
              }
            } else {
              events.pop();
              pos_er_no++;
            }
          }
        } else {
          pos_er_no++;
        }

        nno += 1;
      }

      //.........................................................FIN NOCHES.................................................................

      if (pos_er == 9 || pos_er_no == 9) {
        events = [];
        swit = 1;
        ercont++;
        pos_er = 0;
        n = 0;
        i = 0;
        s1 = 0;
        s2 = 0;
        s3 = 0;
        s4 = 0;
        d = 0;
        s = 0;
        h = 0;
        je = 0;
        dayst = "";
        daynu = 0;
        cantcor = 0;
        cantfdc = 0;
        asignadosco = [];
        cant_cwf = 0;
        cant_fpc = 4;

        shuffle_corridos = shuffle(shuffle_corridos);
        for (let p = 0; p < shuffle_corridos.length; p++) {
          shuffle_corridos[p].contador = 0;
          shuffle_corridos[p].cont_jefes = 0;
        }

        ercontno++;
        pos_er_no = 0;
        nno = 0;
        ino = 0;
        s1no = 0;
        s2no = 0;
        s3no = 0;
        s4no = 0;
        dno = 0;
        sno = 0;
        hno = 0;
        jeno = 0;
        daystno = "";
        daynoc = 0;
        cantnoc = 0;
        cantfdn = 0;
        asignadoscono = [];
        asignadosconopost = [];
        cant_cwfno = 0;
        cant_fpcno = 2;

        shuffle_noches = [];
        shuffle_noches_prev = shuffle(shuffle_noches_prev);
        for (let p = 0; p < shuffle_noches_prev.length; p++) {
          shuffle_noches_prev[p].contador = 0;
          shuffle_noches_prev[p].cont_jefes = 0;
        }
        for (let i = 0; i < turnos_noches_prev2.length; i++) {
          let spl = turnos_noches_prev2[i].fecha.split("-");
          let splpop = spl.pop();
          let splpop_mes = spl.pop();

          if (
            splpop_mes == 1 ||
            splpop_mes == 3 ||
            splpop_mes == 5 ||
            splpop_mes == 7 ||
            splpop_mes == 8 ||
            splpop_mes == 10 ||
            splpop_mes == 11
          ) {
            if (parseInt(splpop) == 31) {
              num2 = 1;
            } else {
              num2 = parseInt(splpop) + 1;
            }
          } else if (
            splpop_mes == 4 ||
            splpop_mes == 6 ||
            splpop_mes == 9 ||
            splpop_mes == 11
          ) {
            if (parseInt(splpop) == 30) {
              num2 = 1;
            } else {
              num2 = parseInt(splpop) + 1;
            }
          } else {
            if (parseInt(splpop) == 28) {
              num2 = 1;
            } else {
              num2 = parseInt(splpop) + 1;
            }
          }

          if (num2 == 1) {
            mes2 = parseInt(splpop_mes) + 1;
            let numstringmes = mes2.toString();
            if (numstringmes.length === 1) {
              numstringmes = `0${numstringmes}`;
            }
          } else {
            mes2 = parseInt(splpop_mes);
            let numstringmes = mes2.toString();
            if (numstringmes.length === 1) {
              numstringmes = `0${numstringmes}`;
            }
          }
          let numstring = num2.toString();
          let numstringmes = mes2.toString();
          if (numstring.length === 1) {
            numstring = `0${numstring}`;
          }
          if (numstringmes.length === 1) {
            numstringmes = `0${numstringmes}`;
          }
          spl.push(numstringmes);
          spl.push(numstring);

          shuffle_noches.push({
            fecha: spl.join("-"),
          });
        }
        break;
      }
    }
  }

  let funcionarios = [];
  let nombre = "";
  let registros = [];
  let count = 0;
  for (let i = 0; i < events.length; i++) {
    nombre = events[i].name;
    if (!registros.includes(nombre)) {
      registros.push(nombre);
      funcionarios.push({
        id: events[i].id,
        name: events[i].name,
        horarios: [],
      });
      events.forEach((element) => {
        if (element.name == funcionarios[count].name) {
          funcionarios[count].horarios.push({
            id: `${element.id}`,
            cedula: `${element.cedula}`,
            tipocontrato: `${element.tipocontrato}`,
            cargo: `${element.cargo}`,
            name: `${element.name}`,
            details1: `${element.details1}`,
            details2: `${element.details2}`,
            start: `${element.start}`,
            end: `${element.end}`,
            color: `${element.color}`,
            idTipoTurno: `${element.idTipoTurno}`,
          });
        }
      });
      count++;
    }
  }

  let returnArray = [];
  returnArray.push(events);
  returnArray.push(funcionarios);
  return returnArray;
}
