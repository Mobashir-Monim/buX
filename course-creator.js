let runID = '2022_Summer';
let all_items = [
    { org_id: 'buX', course_number: 'PSM602', course_name: 'Storage and Distribution' }
]

function single_course_create(org_id, course_number, course_run, course_name) {
    course_id = 'course-V1:' + org_id + '+' + course_number + '+' + course_run;
    $.ajax({
        headers: {

            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: 'https://studio.edunext.co/course/',
        type: 'POST',
        data: JSON.stringify({
            "org": org_id, "number": course_number, "display_name": course_name, "run": course_run
        }),
        success: function (response, textStatus, jqXhr) {
            console.log("course Successfully created for: " + course_id);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // log the error to the console
            console.log("The following error occured for (" + course_id + "): " + textStatus, errorThrown);
        }
    });
}


let intervalID = window.setInterval(function () {
    let current = all_items.pop();

    console.log('buX', current['course_number'], runID);
    single_course_create('buX', current['course_number'], runID, current['course_name']);

}, 4000);