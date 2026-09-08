#import "@preview/basic-resume:0.2.9": *

// Put your personal information here, replacing mine
#let name = "Noah Yurasko"
#let location = "Medford, MA"
#let email = "ndyurasko@gmail.com"
#let github = "github.com/Noah2024"
#let linkedin = "www.linkedin.com/in/noah-yurasko-a86207336/"
#let phone = "+1 (781) 960-7983"
#let personal-site = "indoshon.com"

//Overriding default spacing to fit more stuff in here
#show list: set par(leading: 0.3em, spacing: 0.2em)  
// #show list: set head(leading: 0.3em, spacing: 0.1em)

#show: resume.with(
  author: name,
  // All the lines below are optional.
  // For example, if you want to to hide your phone number:
  // feel free to comment those lines out and they will not show.
  location: location,
  email: email,
  github: github,
  linkedin: linkedin,
  phone: phone,
  personal-site: personal-site,
  accent-color: "#26428b",
  font: "New Computer Modern",
  paper: "us-letter",
  author-position: left,
  personal-info-position: left,
)

/*
* Lines that start with == are formatted into section headings
* You can use the specific formatting functions if needed
* The following formatting functions are listed below
* #edu(dates: "", degree: "", gpa: "", institution: "", location: "", consistent: false)
* #work(company: "", dates: "", location: "", title: "")
* #project(dates: "", name: "", role: "", url: "")
* certificates(name: "", issuer: "", url: "", date: "")
* #extracurriculars(activity: "", dates: "")
* There are also the following generic functions that don't apply any formatting
* #generic-two-by-two(top-left: "", top-right: "", bottom-left: "", bottom-right: "")
* #generic-one-by-two(left: "", right: "")
*/

== Education
#edu(
  institution: "Marist University",
  location: "Poughkeepsie, NY",
  dates: dates-helper(start-date: "May 2024", end-date: "May 2028"),
  degree: "Bachelor's of Science, Computer Science and Mathematics",

  // Uncomment the line below if you want edu formatting to be consistent with everything else
  consistent: true
)
- Cumulative GPA: 3.67\/4.0 |  Honors Program, Presidential Scholarship, Deans Circle, Dean's List.
- Relevant Coursework:  Discrete Mathematics, Linear Algebra, Calculus I/II, Physics, Algorithms Analysis & Design, Software Development I/II, Computer Organization and Architecture, Data Communications

== Work Experience
#work(
  title: "Lead Developer/Volunteer Server Administrator - Marist Minecraft",
  location: "Poughkeepsie, NY",
  company: "Marist University",
  dates: dates-helper(start-date: "Feb 2026", end-date: "Present"),
)
- Implemented custom web app, integrated with SAML2 authentication, in coordination with university Cybersecurity and Networking Teams  
- Developed custom Java application to connect Minecraft proxy server to backend verification database 
- Developed custom automated report generation, integrated with influxdb, and displayed with custom typst pdf template   
- Lead a staff of (5) direct reports  
#work(
  title: "Student Tutor",
  location: "Poughkeepsie, NY",
  company: "Marist University Academic Learning Center",
  dates: dates-helper(start-date: "Feb 2025", end-date: "Present"),
)
- Taught students one-on-one in the university's tutoring program, with a focus on computer science and economics.
- Computer Science Topics: OOP, DataTypes, Recursion, Basic Algorithms, Computer Science Fundamentals
- Economics Topics: Supply/Demand, Marginal Analysis, Gains from Trade Price Elastacity, micro and macroeonomics as needed.

#work(
  title: "Class President Class of 28",
  location: "Poughkeepsie, NY",
  company: "Marist University",
  dates: dates-helper(start-date: "Oct 2024", end-date: "Present"),
)
- Sophomore class representative in the (35) member, University Student Government Body, leading a team  of (3) direct reports with office hours at least 2x weekly in addition to requisite meetings 
- Presented student concerns and proposals on amending university policy to leadership and staff.  
- Organized and facilitated (4) student led and supported events per semester under strict budget constraints.  
- Managed digital communications and team coordination via the use of SharePoint/Teams/Word. 

#work(
  title: "Part Time Desk Staff - Climbing Instructor",
  location: "Everett, MA",
  company: "Metro Rock (Boston Vertical LLC)",
  dates: dates-helper(start-date: "Jun 2022", end-date: "Aug 2025"),
)
- Front end customer service and sales representative, responsible for providing excellent customer service and driving sales. 
- Nationally certified indoor Lead Climbing instructor, frequntly teaching new climbers in a safe and effective manner. 
- Re-organized the business’s POS file structure for easier data analysis and queries.  

== Projects

#project(
  name: "Virtual Processor",
  // Role is optional
  // role: "Developer",
  // Dates is optional
  // URL is also optional
  url: "indoshon.com/apps/422-tsiraM/demo.html",
)
- 8 bit virtual 6502 processor written in typescript w/ virtual CPU, MMU, and Memory along with a custom instruction set
- Capable of being compiled and run nativly in web browsers using web assemmbley 

#project(
  name: "Kitchen Management Suite",
  // Role is optional
  // role: "Developer",
  // Dates is optional
  // URL is also optional
  url: "github.com/Kitchen-Management-Suite/kitchen_management_suite",
)
- Full stack food & pantry tracking app desinged in small group utalizing agile development principles
- Dockerized Postgres backend for easy deployment w/ easily extendable webroutes designed in flask 
- Fontend desinged entielry in native html, css, and javscript with Jinja templating for simplfied dynamic content insertion

#project(
  name: "Personal Website",
  // Role is optional
  // role: "Developer",
  // Dates is optional
  // URL is also optional
  url: "indoshon.com",
)
- Statically generated and self hosted personal website built with html, css, and javascript and deployed with docker and nginx
- Both domain and hosting are self managed and maintained, w/ a fully integrated CICD pipeline keeps that the live site updated with changes to the git repo and automatically updates all webroutes
#project(
  name: "3D Chess CLI ",
  // Role is optional
  // role: "Developer",
  // Dates is optional
  // URL is also optional
  url: "github.com/Noah2024/3D-Chess-CLI",
)
- 3D a Command-Line-Interface built in golang to make, change, and validate 3 Dimensions of play for a game of chess.
-  Complete with a contribution guide and full test suite for further development of new features (such as eventual full UI)
== Extracurricular Activities
Climbing Club (Co Founder), Computer Society, Intramural Volleyball
// #extracurriculars(
//   activity: "Climbing Club (Co-Founder)",
//   dates: dates-helper(start-date: "Jan 2021", end-date: "Present"),
// )


// #extracurriculars(
//   activity: "Science Olympiad Volunteering",
//   dates: "Sep 2023 --- Present"
// )
// - Volunteer and write tests for tournaments, including LA Regionals and SoCal State \@ Caltech

// #certificates(
//   name: "OSCP",
//   issuer: "Offensive Security",
//   // url: "",
//   date: "Oct 2024",
// )

== Skills
- *Programming Languages*: JavaScript/Typescript, Python, HTML/CSS, Java, Bash, Golang
- *Technologies*: Git, UNIX, Linux, Docker, NGINX, Postgres, InfluxDb, Grafana, Windows, Cloudflare, SAML2, SSH, Typst
