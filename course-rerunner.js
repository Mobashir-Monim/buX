let newRunID = '2022_Summer'; // Please replace this with the run_id for the semester that you want to run for
let rerunFrom = [
    { link: 'course-v1:buX+PHR101+2022_Spring', title: 'Inorganic Pharmacy I' },
];

const single_course_rerun = (rerun_link, title, code) => {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: 'https://studio.edunext.co/course/',
        type: 'POST',
        data: JSON.stringify(generateJSONBody(rerun_link, title, code)),
        success: function (response, textStatus, jqXhr) {
            console.log("course Successfully re-ran for: " + rerun_link);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // log the error to the console
            console.log("The following error occured for (" + rerun_link + "): " + textStatus, errorThrown);
        }
    });
}


let intervalID = window.setInterval(function () {
    if (rerunFrom.length > 0) {
        let current = rerunFrom.pop();

        console.log(current.link);
        single_course_rerun(current.link, current.title, current.code);
        console.log(`Re-runs remaining ${rerunFrom.length}`)
    } else {
        doneReRunning();
    }
}, 4000);

const generateJSONBody = (rerun_link, title, code) => {
    rerun_link = rerun_link.split('/');
    let source_course_key = rerun_link[rerun_link.length - 1];
    let bodyContent = source_course_key.replace('course-v1:', '').split('+');

    return {
        display_name: title,
        number: code === undefined ? bodyContent[1] : code,
        org: 'buX',
        run: newRunID,
        source_course_key: source_course_key
    }
}

const doneReRunning = () => {
    clearInterval(intervalID);
    console.log('Done Rerunning all courses in the list');
}