
$(document).ready(function() {


$('#calendar').fullCalendar({
    header: {
        left: 'prev,next today',
        center: 'title',
        right: ''
    },
    defaultDate: '2016-12-14',
    editable: true,
    
    eventDrop: function(event){
        event.start._i = event.start.format();
    },
    eventResize: function(event) {
        event.end._i = event.end.format();
    },
    
    eventLimit: true, // allow "more" link when too many events
    events: [{
        id: 'All Day Event',
        title: 'All Day Event',
        start: '2016-12-14'
    }, {
        id: 'popo',
        title: 'popo',
        start: '2016-12-14T04:16:50',
        end:   '2016-12-15T04:17:50',
        description: 'This is a cool event',
        color: 'rgb(142, 67, 163)',
        textColor: 'white'
    }, {
        id: 'popo2',
        title: 'popo2',
        start: '2016-12-14'
    }]
});


$('#calendar').on('click','.fc-day',function(){
    var myPrompt = prompt('스케줄을 입력해주세요.','팀명,지역,시간');
    if(myPrompt != null && myPrompt != ''){
        $('#calendar').fullCalendar('addEventSource', [{
            id: myPrompt,
            title: myPrompt,
            start: $(this).attr('data-date')
        }]);
    }
});

$('#calendar').on('click','.fc-content',function(){
    var gugu = $(this).children('.fc-title').html();
    $('#calendar').fullCalendar('removeEvents', gugu);
});


});
