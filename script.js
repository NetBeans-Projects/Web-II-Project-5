function createNewAccount() {
  const mobile = document.getElementById("mobile").value;
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const password = document.getElementById("password").value;
  const country = document.getElementById("country").value;

  // alert(`Account created successfully!\n
  // Mobile: ${mobile}\n
  // First Name: ${fname}\n
  // Last Name: ${lname}\n
  // Password: ${password}\n
  // Country: ${country}`);

  // console.log("Mobile:", mobile);
  // console.log("First Name:", fname);
  // console.log("Last Name:", lname);
  // console.log("Password:", password);
  // console.log("Country:", country);

  // JS Object
  const user = {
    mobile: mobile,
    firstName: fname,
    lastName: lname,
    password: password,
    country: country,
  };

  // JS Object to JSON String
  const userJSON = JSON.stringify(user);
  // console.log("User Object:", user);

  // Send Request
  const ajax = new XMLHttpRequest();
  ajax.open("POST", "http://localhost:8080/Web_II_Project_5/CreateNewAccount", true);

  ajax.onreadystatechange = function () {

    if (ajax.readyState === 4) {

      if (ajax.status === 200) {
        alert("Account created successfully!");
      } else if (ajax.readyState === 4) {
        alert("Please try again later!");
      }

    }

  };

  ajax.send();
}
