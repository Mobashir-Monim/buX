let url = "https://studio.edunext.co/course_team/COURSE/EMAIL";
let courseList = [
    { course: 'course-v1:buX+PHR101+2022_Summer', emails: 'eshaba.karim@bracu.ac.bd' },
];

const single_course_staff_add = (course, emails) => {
    emails.split(",").forEach(email => {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: `https://studio.edunext.co/course_team/${course}/${email}`,
            type: 'POST',
            data: JSON.stringify({ role: "instructor" }),
            success: (response, textStatus, jqXhr) => {
                console.log(`Successfully added ${email} to ${course}`);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(`Failed adding ${email} to ${course}`);
            }
        });
    });
}

let intervalID = window.setInterval(function () {
    if (courseList.length > 0) {
        let current = courseList.pop();

        console.log(current.course);
        single_course_staff_add(current.course, current.emails);
        console.log(`Courses remaining ${courseList.length}`)
    } else {
        doneAdding();
    }
}, 4000);

const doneAdding = () => {
    clearInterval(intervalID);
    console.log('Done adding all coordinators');
}

// =INDEX(FILTER(B:B,REGEXMATCH(C:C,C2)), MATCH(FALSE,ISBLANK(FILTER(B:B,REGEXMATCH(C:C,C2))),-1))