let newRunID = '2022_Summer'; // Please replace this with the run_id for the semester that you want to run for
let rerunFrom = [
    { link: 'course-v1:buX+PHR101+2022_Spring', title: 'Inorganic Pharmacy I' },
    { link: 'course-v1:buX+PHR102+2022_Spring', title: 'Organic Pharmacy' },
    { link: 'course-v1:buX+PHR103+2022_Spring', title: 'Pharmacognosy I (PHR)' },
    { link: 'course-v1:buX+PHR107+2022_Spring', title: 'Inorganic Pharmacy II (PHR)' },
    { link: 'course-v1:buX+PHR108+2022_Spring', title: 'Physical Pharmacy I' },
    { link: 'course-v1:buX+PHR109+2022_Spring', title: 'Physiology I' },
    { link: 'course-v1:buX+PHR110+2022_Spring', title: 'Pharmaceutical Microbiology I' },
    { link: 'course-v1:buX+PHR111+2021_Summer', title: 'Basic Anatomy' },
    { link: 'course-v1:buX+PHR201+2021_Summer', title: 'Physical Pharmacy II' },
    { link: 'course-v1:buX+PHR204+2022_Spring', title: 'Physiology II (PHR)' },
    { link: 'course-v1:buX+PHR205+2020_Summer', title: 'Pharmacognosy II (PHR)' },
    { link: 'course-v1:buX+PHR210+2022_Spring', title: 'Pharmaceutical Analysis I' },
    { link: 'course-v1:buX+PHR211+2021_Summer', title: 'Biostatistics' },
    { link: 'course-v1:buX+PHR212+2022_Spring', title: 'Pharmaceutical Technology I' },
    { link: 'course-v1:buX+PHR213+2022_Spring', title: 'Pharmacology I' },
    { link: 'course-v1:buX+PHR302+2022_Spring', title: 'Pharmacology II' },
    { link: 'course-v1:buX+PHR303+2022_Spring', title: 'Pharmaceutical Technology II' },
    { link: 'course-v1:buX+PHR304+2022_Spring', title: 'Biopharmaceutics and Pharmacokinetics I' },
    { link: 'course-v1:buX+PHR310+2022_Spring', title: 'Pharmaceutical Analysis II' },
    { link: 'course-v1:buX+PHR311+2022_Spring', title: 'Medicinal Chemistry II' },
    { link: 'course-v1:buX+PHR312+2022_Spring', title: 'Pharmaceutical Engineering (PHR)' },
    { link: 'course-v1:buX+PHR313+2022_Spring', title: 'Biopharmaceutics and Pharmacokinetics II' },
    { link: 'course-v1:buX+PHR314+2021_Summer', title: 'Pharmaceutical Management (PHR)' },
    { link: 'course-v1:buX+PHR401+2021_Summer', title: 'Medicinal Chemistry III' },
    { link: 'course-v1:buX+PHR402+2022_Spring', title: 'Pharmaceutical Technology III' },
    { link: 'course-v1:buX+PHR403+2022_Spring', title: 'Pharmaceutical Biotechnology' },
    { link: 'course-v1:buX+PHR404+2022_Spring', title: 'Cosmetology (PHR)' },
    { link: 'course-v1:buX+PHR405+2022_Spring', title: 'Clinical Pharmacy' },
    { link: 'course-v1:buX+PHR410+2022_Spring', title: 'Advanced Pharmaceutical Analysis' },
    { link: 'course-v1:buX+PHR411+2022_Spring', title: 'Pharmacology III' },
    { link: 'course-v1:buX+PHR412+2022_Spring', title: 'Hospital and Community Pharmacy' },
    { link: 'course-v1:buX+PHR413+2022_Spring', title: 'Pharmaceutical Regulatory Affairs' },
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