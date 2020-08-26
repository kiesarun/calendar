var _currentDate = new Date();

var _month = _currentDate.getMonth();
var _day = _currentDate.getDate();
var _year = _currentDate.getFullYear();

function getDaysOfMonth(month, year) {
    var days = new Array(42);
    var date = new Date(year, month);
    var currentMonth = month;
    var currentDay = date.getDay()                  // sun - sat
    var preMonth = currentMonth - 1 
    var preMonthDate = new Date(year, preMonth)
    var newMonthDate = 1

    while (preMonth !== month) {
        var preDate = preMonthDate.getDate()
        preDate++
        var preMonthDate = new Date(year, preMonth, preDate)
        preMonth = preMonthDate.getMonth()
    }

    for (var i = 0; i < 42; i++ ) {
        if (i < currentDay) {
            days[i] = preDate - currentDay + i
        }else if (currentMonth === month) {
            var currentDate = date.getDate()
            days[i] = currentDate++;
            date = new Date(year, month, currentDate)
            currentMonth = date.getMonth()
        } else {
            days[i] = newMonthDate++
        }
    }

    var htmlCode = '<tr>'
    var start = false
    var monthNow = _month - 1
    days.forEach((date, index) => {
        if (index % 7 === 0 && index !== 0) {
            htmlCode = htmlCode + '</tr><tr>'
        }
        if (date === 1 ) {
            if (start) {
                start = false
                monthNow = _month + 1
            } else {
                start = true
                monthNow = _month
            }
        }

        var dayOfWeek = new Date(_year, monthNow, date).getDay()

        if (start) {
            if (today() === date) {
                htmlCode = htmlCode + '<td><div class="today">' + date + '</div></td>'
            } else if (dayOfWeek === 0) {
                htmlCode = htmlCode + '<td class="sunday">'+ date + '</td>'
            } else {
                htmlCode = htmlCode + '<td>' + date + '</td>'
            }
        } else {
            if (dayOfWeek === 0) {
                htmlCode = htmlCode + '<td class="sunday-not-current-month">' + date + '</td>'
            } else {
                htmlCode = htmlCode + '<td class="not-current-month">' + date + '</td>'
            }
        }
    });

    return htmlCode = htmlCode + '</tr>'
}

function getMonth(currentDate) {
    var month = currentDate.toLocaleString('default', { month: 'short' })
    var currentYear = new Date().getFullYear()
    monthHeader = month.toString().toUpperCase()
    
    return monthHeader
}


function changeMonth(direction) {
    if (direction === 'next') {
        _month = _month + 1 
    } else {
        _month = _month - 1 
    }

    if (_month === -1 ) {
        _month = 11
        _year = _year - 1
    } else if (_month > 11) {
        _month = 0
        _year = _year + 1
    }

    _currentDate = new Date(_year, _month)
    $('.month-name').html(getMonth(_currentDate))
    $('.year').html(_year.toString())
    $('#day').html(getDaysOfMonth(_month, _year))
}

function today() {
    var today = new Date()
    var year = today.getFullYear()
    var month = today.getMonth()
    var date = today.getDate()

    if (_year === year && _month === month) {
        return date
    }

}

function goToday() {
    var today = new Date()
    var year = today.getFullYear()
    var month = today.getMonth()
    var date = today.getDate()
    _year = year
    _month = month

    $('.month-name').html(getMonth(today))
    $('.year').html(_year.toString())
    $('#day').html(getDaysOfMonth(month, year))
}


$('.month-name').html(getMonth(_currentDate))
$('.year').html(_year.toString())
$('#day').html(getDaysOfMonth(_month, _year))
$('.current-date').html(today())
