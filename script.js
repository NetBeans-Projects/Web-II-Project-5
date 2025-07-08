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
  ajax.open(
    "POST",
    "http://localhost:8080/Web_II_Project_5/CreateNewAccount",
    true
  );

  ajax.onreadystatechange = function () {
    if (ajax.readyState === 4) {
      if (ajax.status === 200) {
        alert("Account created successfully!");
      } else if (ajax.readyState === 4) {
        alert("Please try again later!");
      }
    }
  };

  ajax.send(userJSON);
}

function userLogin() {
  const mobile = document.getElementById("mobile").value;
  const password = document.getElementById("password").value;

  const loginData = {
    mobile: mobile,
    password: password,
  };

  const loginJSON = JSON.stringify(loginData);
  // console.log(loginJSON);

  const ajax = new XMLHttpRequest();

  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4) {
      if (ajax.status == 200) {
        alert(ajax.responseText);
      } else {
        alert("User login failed.");
      }
    }
  };

  ajax.open("POST", "http://localhost:8080/Web_II_Project_5/login", true);

  ajax.withCredentials = true;
  ajax.send(loginJSON);
}

function loadUsers() {
  const tbody = document.getElementById("user_data_body");

  var count = 1;

  const ajax = new XMLHttpRequest();

  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4) {
      if (ajax.status == 200) {
        // alert(ajax.responseText);

        const users = JSON.parse(ajax.responseText);

        // users.forEach((u) => {
        //   tbody += `
        //   <tr>
        //     <td>${count}</td>
        //     <td>${u.firstName}</td>
        //     <td>${u.lastName}</td>
        //     <td>${u.mobile}</td>
        //     <td>${u.country}</td>
        //     </tr>
        //     `;
        //   count++;
        // });

        users.forEach((u, index) => {
          tbody.innerHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${u.firstName}</td>
            <td>${u.lastName}</td>
            <td>${u.mobile}</td>
            <td>${u.country}</td>
            </tr>
            `;
          count++;
        });
      } else {
        alert("user data loading failed.");
      }
    }
  };

  ajax.open("GET", "http://localhost:8080/Web_II_Project_5/all_users", true); // some use link with (api/v1/all_users)
  ajax.send();
}
