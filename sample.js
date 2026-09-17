const internships=[
    {
        title: "Software Engineering Intern",
        company: "TechCorp",
        location: "Colombo"
    },

    {
        title: "Data Science Intern",
        company: "DataWorks",
        location: "Kandy"
    },

    {
        title: "MERN",
        company: "InnovateX",
        location: "Colombo"
    }
];

const titles=internships.map(internship=>internship.company);
document.write(titles.join("<br>"));
