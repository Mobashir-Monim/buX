let runID = '2022_Spring';
let courseList = [
    { code: 'CSE101', emails: 'tanzim.reza@bracu.ac.bd,nadia.rubaiyat@bracu.ac.bd' },
];

const single_course_staff_add = (code, emails) => {
    emails.split(",").forEach(email => {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: `https://bux.bracu.ac.bd/courses/course-v1:buX+${code}+${runID}/instructor/api/modify_access`,
            type: 'POST',
            data: JSON.stringify({
                unique_student_identifier: email,
                rolename: "instructor",
                action: "allow"
            }),
            success: (response, textStatus, jqXhr) => {
                console.log(`Successfully added ${email} to ${code}`);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(`Failed adding ${email} to ${code}`);
            }
        });
    });
}

let intervalID = window.setInterval(function () {
    if (courseList.length > 0) {
        let current = courseList.pop();

        console.log(current.code);
        single_course_staff_add(current.code, current.emails);
        console.log(`Courses remaining ${courseList.length}`)
    } else {
        doneAdding();
    }
}, 4000);

const doneAdding = () => {
    clearInterval(intervalID);
    console.log('Done adding all coordinators');
}