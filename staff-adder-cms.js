let url = "https://studio.edunext.co/course_team/COURSE/EMAIL";
let courseList = [
    { course: 'course-v1:buX+PHR101+2022_Summer', emails: 'eshaba.karim@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR102+2022_Summer', emails: 'sania.ashrafi@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR103+2022_Summer', emails: 'sabrina.sharmin@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR107+2022_Summer', emails: 'tanisha.momtaz@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR108+2022_Summer', emails: 'afrina.afrose@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR109+2022_Summer', emails: 'tanisha.momtaz@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR110+2022_Summer', emails: 'mohd.raeed@bracu.ac.bd,mohd.raeed@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR111+2022_Summer', emails: 'sharmin@bracu.ac.bd,sharmin@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR201+2022_Summer', emails: 'eshaba.karim@bracu.ac.bd' },

    { course: 'course-v1:buX+PHR205+2022_Summer', emails: 'afrina.afrose@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR210+2022_Summer', emails: 'eshaba.karim@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR211+2022_Summer', emails: 'namara.chowdhury@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR212+2022_Summer', emails: 'aminul.haque@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR213+2022_Summer', emails: 'farhana@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR302+2022_Summer', emails: 'farzana.islam@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR303+2022_Summer', emails: 'afrina.afrose@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR304+2022_Summer', emails: 'raushanara@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR310+2022_Summer', emails: 'sabrina.sharmin@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR311+2022_Summer', emails: 'raushanara@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR312+2022_Summer', emails: 'sharmin@bracu.ac.bd,sharmin@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR313+2022_Summer', emails: 'zareen.nishat@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR314+2022_Summer', emails: 'tanisha.khan@bracu.ac.bd,tanisha.khan@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR401+2022_Summer', emails: 'humair.omer@bracu.ac.bd,humair.omer@bracu.ac.bd,zareen.nishat@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR402+2022_Summer', emails: 'tanisha.khan@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR403+2022_Summer', emails: 'tanisha.khan@bracu.ac.bd,tanisha.khan@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR404+2022_Summer', emails: 'aminul.haque@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR405+2022_Summer', emails: 'mesbah.talukder@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR410+2022_Summer', emails: 'hasina.yasmin@bracu.ac.bd,hasina.yasmin@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR411+2022_Summer', emails: 'namara.chowdhury@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR412+2022_Summer', emails: 'sharmind@bracu.ac.bd' },
    { course: 'course-v1:buX+PHR413+2022_Summer', emails: 'faruque.azam@bracu.ac.bd' },
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