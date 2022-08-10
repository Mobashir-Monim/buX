let runs = ["2021_Summer", "2021_Spring", "2020_Fall", "2020_Summer"];
let studio_links = [
    'https://studio.edunext.co/course/course-v1:buX+ACT201+2021_Fall',
]
let current_check = 0;
let run_check = 1;
let status_404 = [];
let create_required = [];
let last_runs = [];

const moveToNextCheckIteration = () => {
    current_check += 1;

    if (current_check < studio_links.length) {
        checkCourse();
    } else {
        console.log('done');
    }
}

const checkCourse = () => {
    fetch(studio_links[current_check], {
        method: 'get'
    }).then(response => {
        if (response.status != 200) {
            status_404.push(studio_links[current_check]);
        }
    }).then(data => {
        moveToNextCheckIteration();
    }).catch(error => {
        moveToNextCheckIteration()
    });
}

const progressStatus = () => {
    console.log(100 * current_check / studio_links.length)
}

let current_copy = 0;
let copy_inp = document.getElementById('copy-inp');

const copyNext = () => {
    copy_inp.value = status_404[current_copy];
    $(`#copy-inp`).select();
    document.execCommand('copy');
    console.log('copied');
    console.log(status_404[current_copy])
    current_copy += 1;
}