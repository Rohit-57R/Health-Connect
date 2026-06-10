
// FORM PROGRESS

const formInputs = document.querySelectorAll("#patientForm input,#patientForm select,#patientForm textarea");

formInputs.forEach(input => {

    input.addEventListener("input", updateProgress);

});

function updateProgress(){

    let filled = 0;

    formInputs.forEach(input => {

        if(input.value.trim() !== ""){
            filled++;
        }

    });

    let percent = (filled / formInputs.length) * 100;

    document.getElementById("progressBar").style.width =
        percent + "%";
}

// PATIENT FORM

document.getElementById("patientForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    let name =
    document.getElementById("name").value;

    let age =
    document.getElementById("age").value;

    let issue =
    document.getElementById("issue").value;

    let summary =
    `Patient ${name} (${age} years old) reports: ${issue}`;

    document.getElementById("summary")
    .innerText = summary;

    let department = "General Consultation";

    let lowerIssue = issue.toLowerCase();

    if(lowerIssue.includes("fever") ||
       lowerIssue.includes("cough")){

        department = "General Medicine";
    }

    else if(lowerIssue.includes("tooth")){

        department = "Dental Department";
    }

    else if(lowerIssue.includes("eye")){

        department = "Ophthalmology";
    }

    else if(lowerIssue.includes("heart")){

        department = "Cardiology";
    }

    document.getElementById("department")
    .innerHTML =
    `<strong>Recommended Department:</strong> ${department}`;

    saveRecord(name, age, issue, department);

});

// SAVE RECORD

function saveRecord(name, age, issue, department){

    let records =
    JSON.parse(localStorage.getItem("patients")) || [];

    records.push({
        name,
        age,
        issue,
        department
    });

    localStorage.setItem(
        "patients",
        JSON.stringify(records)
    );

    loadRecords();
}

// LOAD RECORDS

function loadRecords(){

    let records =
    JSON.parse(localStorage.getItem("patients")) || [];

    let output = "";

    records.forEach(record => {

        output += `
        <div class="record">
            <b>${record.name}</b><br>
            Age: ${record.age}<br>
            Issue: ${record.issue}<br>
            Department: ${record.department}
        </div>
        `;

    });

    document.getElementById("records")
    .innerHTML = output;
}

loadRecords();

// CHATBOT

function chatbot(){

    let q =
    document.getElementById("question")
    .value.toLowerCase();

    let answer = "";

    if(q.includes("fever")){

        answer =
        "Drink water, take rest and consult a doctor if symptoms continue.";
    }

    else if(q.includes("covid")){

        answer =
        "COVID symptoms include fever, cough and breathing difficulties.";
    }

    else if(q.includes("appointment")){

        answer =
        "Appointments can be booked through hospital reception.";
    }

    else if(q.includes("emergency")){

        answer =
        "Call 108 immediately for emergency medical assistance.";
    }

    else{

        answer =
        "Thank you. A healthcare volunteer will contact you soon.";
    }

    document.getElementById("answer")
    .innerText = answer;
}

// VOLUNTEER

function registerVolunteer(){

    let name =
    document.getElementById("volunteerName").value;

    if(name === ""){

        showToast("Patient Registered Successfully");

        return;
    }

    document.getElementById("volunteerMsg")
    .innerHTML =
    `✅ Thank you ${name}, you are registered successfully.`;
}

// HEALTH TIPS

function generateTip(){

    let tips = [

        "Drink at least 8 glasses of water daily.",

        "Walk for 30 minutes every day.",

        "Get 7-8 hours of quality sleep.",

        "Avoid excessive junk food.",

        "Practice meditation for stress management.",

        "Eat fresh fruits and vegetables daily.",

        "Exercise regularly to maintain fitness."

    ];

    let randomTip =
    tips[Math.floor(Math.random() * tips.length)];

    document.getElementById("healthTip")
    .innerText = randomTip;
}

function showToast(message){

    const toast =
    document.getElementById("toast");

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    },3000);
}