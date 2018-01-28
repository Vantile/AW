"use strict";

$(() => {

    let authUser = null;
    let authPassword = null;
    let authId = null;
    let base64user = null;

    $("#unirseBtn").on("click", () => {
        let idJugador = authId;
        let idPartida = $("#unirseId").val();
        console.log(idPartida);
        $.ajax({
            type: "POST",
            url: "/partidas/unirsePartida",
            contentType: "application/json",
            beforeSend: function(req) {
                if (base64user) {
                    req.setRequestHeader("Authorization", "Basic " + base64user);
                }
            },
            data: JSON.stringify({ idPartida: idPartida, idJugador: idJugador }),
            success: (data, textStatus, jqXHR) => {
                $("#errorTxt").text("Se ha unido a la partida");
            },
            error: (jqXHR, textStatus, errorThrown) => {
                if (jqXHR.status === 401) {
                    base64user = null;
                    authUser = null;
                    authPassword = null;
                    authId = null;
                    $("#titleUser").text("");
                    $("#titleUser").addClass("hidden");
                    $("#disconnectBtn").addClass("hidden");
                    $("#loginContainer").removeClass("hidden");
                    $("#profileContainer").addClass("hidden");
                    $("#errorTxt").text("Necesitas hacer login.");
                } else if (jqXHR.status === 500) {
                    console.log(textStatus + " " + errorThrown);
                    console.log(jqXHR);
                }
            }
        });
    });
    $("#loginBtn").on("click", () => {
        let user = $("#usernameInput").val();
        let password = $("#passwordInput").val();
        $.ajax({
            type: "POST",
            url: "/users/login",
            contentType: "application/json",
            data: JSON.stringify({ user: user, password: password }),
            success: (data, textStatus, jqXHR) => {
                let response = JSON.parse(jqXHR.responseText);
                if (response.found) {
                    base64user = btoa(user + ":" + password);
                    authUser = user;
                    authPassword = password;
                    authId = response.userId;
                    $("#titleUser").text(user);
                    $("#titleUser").removeClass("hidden");
                    $("#disconnectBtn").removeClass("hidden");
                    $("#loginContainer").addClass("hidden");
                    $("#profileContainer").removeClass("hidden");
                } else {
                    $("#errorTxt").text("No encontrado");
                }
            },
            error: (jqXHR, textStatus, errorThrown) => {
                $("#errorTxt").text("No se pudo conectar. Intentalo de nuevo mas tarde.");
            }
        });
    });

    $("#disconnectBtn").on("click", () => {
        base64user = null;
        authUser = null;
        authPassword = null;
        authId = null;
        $("#titleUser").text("");
        $("#titleUser").addClass("hidden");
        $("#disconnectBtn").addClass("hidden");
        $("#loginContainer").removeClass("hidden");
        $("#profileContainer").addClass("hidden");
    })

    $("#newUserBtn").on("click", () => {
        let user = $("#usernameInput").val();
        let password = $("#passwordInput").val();
        $.ajax({
            type: "POST",
            url: "/users/newUser",
            contentType: "application/json",
            data: JSON.stringify({ user: user, password: password }),
            success: (data, textStatus, jqXHR) => {
                $("#errorTxt").text("Creado");
            },
            error: (jqXHR, textStatus, errorThrown) => {
                if (jqXHR.status === 400) {
                    $("#errorTxt").text("Usuario ya existente");
                } else if (jqXHR.status === 500) {
                    $("#errorTxt").text("No se pudo conectar. Intentalo de nuevo.");
                }
            }
        });
    });

    $("#newPartidaBtn").on("click", () => {
        let nombre = $("#nombrePartidaInput").val();

        $.ajax({
            type: "POST",
            url: "/partidas/newPartida",
            beforeSend: function(req) {
                if (base64user) {
                    req.setRequestHeader("Authorization", "Basic " + base64user);
                }
            },
            contentType: "application/json",
            data: JSON.stringify({ nombre: nombre }),
            success: (data, textStatus, jqXHR) => {
                $("#errorTxt").text("Creada");

            },
            error: (jqXHR, textStatus, errorThrown) => {
                if (jqXHR.status === 401) {
                    base64user = null;
                    authUser = null;
                    authPassword = null;
                    authId = null;
                    $("#titleUser").text("");
                    $("#titleUser").addClass("hidden");
                    $("#disconnectBtn").addClass("hidden");
                    $("#loginContainer").removeClass("hidden");
                    $("#profileContainer").addClass("hidden");
                    $("#errorTxt").text("Necesitas hacer login.");
                } else if (jqXHR.status === 500) {
                    $("#errorTxt").text("No se pudo conectar. Intentalo de nuevo.");
                }
            }
        });
    });

});