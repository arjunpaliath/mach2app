function checkRequiredData() {
    var jFirst = document.getElementById("fname").value;
    var jLast = document.getElementById("lname").value;
    var jDob = document.getElementById("dob").value;
    var jMobNo = document.getElementById("mobNo").value;
    if (!jFirst.length || !jLast.length || !jDob.length || !jMobNo.length) {
        console.log('Values cannot be empty');
    }
    else {
        var userinfo = {
            name: jFirst + ' ' + jLast,
            dob: jDob,
            phone: jMobNo
        };
        sendDataToFreshchat(userinfo);
    }
}

function sendDataToFreshchat(userinfo) {
    console.log(getParameterByName('source'));
    console.log(getParameterByName('fc_user_id'));
    console.log(userinfo);
    // var url = 'https://enw2amch0nr7k.x.pipedream.net';
    var url = 'https://hooks3.freshworks.com/lkk/m8ftSXFMyZeKMqk/6b2DyKwZsaYETcP8QjlI0J+0h4DUmfBTQUVXAA==';
    var payload = {
        "user_id": getParameterByName('fc_user_id'),
        "user_info": userinfo
    };

    // axios.post('https://enw2amch0nr7k.x.pipedream.net' {
    //     "method": "POST",
    //     "url": "",
    //     "headers": {
    //         "Content-Type": "application/json; charset=utf-8"
    //     },
    //     "data": {
    //         "user_id": getParameterByName('fc_user_id'),
    //         "user_info": userinfo
    //     }
    // });
    axios.post(url, payload).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function validatedate(inputText) {
    var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    // Match the date format through regular expression
    if (inputText.value.match(dateformat)) {
        document.form1.text1.focus();
        //Test which seperator is used '/' or '-'
        var opera1 = inputText.value.split('/');
        var opera2 = inputText.value.split('-');
        lopera1 = opera1.length;
        lopera2 = opera2.length;
        // Extract the string into month, date and year
        if (lopera1 > 1) {
            var pdate = inputText.value.split('/');
        }
        else if (lopera2 > 1) {
            var pdate = inputText.value.split('-');
        }
        var dd = parseInt(pdate[0]);
        var mm = parseInt(pdate[1]);
        var yy = parseInt(pdate[2]);
        // Create list of days of a month [assume there is no leap year by default]
        var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mm == 1 || mm > 2) {
            if (dd > ListofDays[mm - 1]) {
                alert('Invalid date format!');
                return false;
            }
        }
        if (mm == 2) {
            var lyear = false;
            if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                lyear = true;
            }
            if ((lyear == false) && (dd >= 29)) {
                alert('Invalid date format!');
                return false;
            }
            if ((lyear == true) && (dd > 29)) {
                alert('Invalid date format!');
                return false;
            }
        }
    }
    else {
        document.form1.text1.focus();
        return false;
    }
}

function phonenumber(inputtxt) {
    var phoneno = /^\d{10}$/;
    if ((inputtxt.value.match(phoneno))) {
        return true;
    }
    else {
        return false;
    }
}

function submitData() {
    window.webkit.messageHandlers.freshchatSetProperties.postMessage({ "First Name": jFirst, "Last Name": jLast, "Date of Birth": jDob, "Account Number": jAccNo, "Mobile Number": jMobNo, "Address": jAddress })
    window.webkit.messageHandlers.freshchatCloseScreen.postMessage('Close')
}