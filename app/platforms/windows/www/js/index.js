/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var Environments = {
    brower: "http://localhost:8080",
    app: "http://10.11.51.178:8080"
}

var Environment = "";


app.initialize();

$(document).ready(function(){
    setEnvironment(Environments.app);
    $(".button-collapse").sideNav();    
    $(".modal").modal();
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: true // Close upon selecting a date,
      });
    $('select').material_select(); 
    $(".button-collapse").sideNav();   
});

function getEnvironment(){
    return Environment;
}

function setEnvironment(path){
    Environment = path;
}

function showLoading(){
    $('#modalLoading').modal('open');
}

function hideLoading(){
    $('#modalLoading').modal('close');
}

function prepareDateToServer(date){
    var arrDate = date.split(" ");
    return `${arrDate[2]}-${getMonthIndex(arrDate[1].replace(",",""))}-${arrDate[0]}`
}

function getMonthIndex(month){
    switch(month) {
        
        case "January":
            return 1;
        case "February":
            return 2;
        case "March":
            return 3;
        case "April":
            return 4
        case "May":
            return 5;
        case "June":
            return 6;
        case "July":
            return 7;
        case "August":
            return 8;
        case "September":
            return 9;
        case "October":
            return 10;
        case "November":
            return 11;
        case "December":
            return 12;
    }
    return undefined;
}

function showAlert(mensagem, tipo){
    backgroundClass = "";
    switch(tipo){
        case "info":
            backgroundClass = "indigo lighten-2";
            break ;
        case "error":
            backgroundClass = "red lighten-2";
            break;
        case "success":
            backgroundClass = "green lighten-2";
            break;
    }

    $("#alertMessage").empty();
    $("#alertMessage").append(mensagem);

    $("#alertContent").removeClass("indigo");
    $("#alertContent").removeClass("red");
    $("#alertContent").removeClass("green");
    $("#alertContent").removeClass("lighten-2");    
    
    $("#alertContent").addClass(backgroundClass);

    $("#modalAlert").modal("open");
    
}

