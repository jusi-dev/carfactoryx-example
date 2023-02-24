const bookSerive3 = document.querySelector('#service-3-book');
let selectedService = document.querySelector('.selected-service');
let wantedService;

console.log("Booking handler ready");

function runAPI(serviceName, serviceDescription, serviceDate, serviceTime) {
    fetch("https://carfactoryx.justin-winistoerfer.dev:443/api?serviceReq=" + serviceName + "&serviceDesc=" + serviceDescription + "&serviceDate=" + serviceDate + "&serviceTime=" + serviceTime)
        .then((response) => response.json())
        .then((json) => console.log(json));
};

bookSerive3.addEventListener('click', () => {
    var li = document.createElement("li");
    var input = "Wash, Dry & Polish";
	li.appendChild(document.createTextNode(input));
    li.classList.add('wanted-service');
	selectedService.appendChild(li);
    wantedService = document.querySelector('.wanted-service').innerHTML;
});

var fname = document.querySelector('#fname');
var lname = document.querySelector('#lname');
var mail = document.querySelector('#mail');
var tel = document.querySelector('#tel');
var date = document.querySelector('#date');
const submitService = document.querySelector('#submitService');

submitService.addEventListener('click', () => {
    var fname = document.querySelector('#fname').value;
    var mail = document.querySelector('#mail').value;
    var tel = document.querySelector('#tel').value;
    var date = document.querySelector('#date').value;
    var time = document.querySelector('#time').value;
    var formatedTime = time + ":00";

    runAPI(wantedService, `Name: ${fname} E-Mail: ${mail} Telephone: ${tel}`, date, formatedTime);
})