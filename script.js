function add_cart(itemtext, value) {

    if (localStorage.getItem('itemNames') === null) 
    {
        
        localStorage.setItem('itemNames', JSON.stringify([]));
    } else 
    {
        let storeditemnames = JSON.parse(localStorage.getItem('itemNames'));
        storeditemnames.push(itemtext);
        localStorage.setItem('itemNames', JSON.stringify(storeditemnames));
    }


if (localStorage.getItem('itemValues') === null) 
    {
        
        localStorage.setItem('itemValues', JSON.stringify([]));
    } else 
    {
        let storeditemvalues = JSON.parse(localStorage.getItem('itemValues'));
        storeditemvalues.push(value);
        localStorage.setItem('itemValues', JSON.stringify(storeditemvalues));
    }
}

function clearcart(){

    localStorage.removeItem('itemValues');
    localStorage.removeItem('itemNames');
    window.location.reload();

}

    function cartgen(){
    if (localStorage.getItem('itemValues') === null && localStorage.getItem('itemNames') === null) 
    {
        
        alert('Your cart is empty. Browse our collection and fill it with your favorite items!');
        document.getElementById("mesg").innerHTML = "Nothing here";

        
    }
    else
    {
         let total = 0;
         const table = document.getElementById('myTable');

        let storeditemvalues = JSON.parse(localStorage.getItem('itemValues'));
        let storeditemnames = JSON.parse(localStorage.getItem('itemNames'));


            for (let i = 0; i < storeditemnames.length; i++) 
                {
                    const newRow = table.insertRow();
                    const cell1 = newRow.insertCell();
                    const cell2 = newRow.insertCell();

                    total = total + storeditemvalues[i];
                    
                    cell1.textContent = storeditemnames[i];
                    cell2.textContent = storeditemvalues[i].toFixed(2);
                }
            
            const newRow = table.insertRow();
                const cell1 = newRow.insertCell();
                const cell2 = newRow.insertCell();
                
                cell1.textContent = "Total";
                cell2.textContent = total.toFixed(2);

                localStorage.setItem('cartTotal', total.toFixed(2));


                
    }
}
function checklogin() 
                {
                 const loginStatus = localStorage.getItem('login');
                if (loginStatus === 'true') 
                {
                   alert("User is logged in");
                    window.history.go(-1);
                 }
 }

  function signin(){

                        
        const enteredemail = document.getElementById('email').value;
        const enteredpassword = document.getElementById('password').value;

        if(localStorage.getItem(enteredemail) === null)
    {
        alert('Your email is not registered or a typo has occured');


    }
    else
        {
            const userDataString = localStorage.getItem(enteredemail);

            if (userDataString !== null)
            {
                const userData = JSON.parse(userDataString);

                if (userData.password === enteredpassword) 
                {
                    localStorage.setItem('login', 'true');

                    alert('Sign in complete 😁!!!')
                    window.open("index.html");
                }
                else
                    {
                        alert('Password or email is incorrect')
                    }
    
            }
        }


    }

function logout()
{
    alert('log out complete')
    localStorage.setItem('login', 'false');
}

function checkoutclick() 
        {
            const address = document.getElementById('address').value;
            const card = document.getElementById('card').value;
  

            if (address.trim() === "") {
                alert("Please enter your shipping address.");
                return;
            }
            
            if (card.trim() === "") {
                alert("Please enter your card number.");
                return;
            }
            const loginStatus = localStorage.getItem('login');
            if (loginStatus === 'true') 
                {
                   alert('Purchase complete');
                   clearcart();
                   window.open("index.html");
                }

            else
            {
                alert('Please Login before placing order');
            }
        }
function signup(){
 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const telephone = document.getElementById('telephone').value;

    valemail(email); 
    valtele(telephone); 

    if (!valemail(email)) {
        return;
    }

    if (!valtele(telephone)) {
        return;
    }


    if (localStorage.getItem(email) === null) 
    {
        
        localStorage.setItem(email, JSON.stringify([]));

          const userinfo = {
            password: password,
            name: name,
            telephone: telephone
        };

        localStorage.setItem(email, JSON.stringify(userinfo));
        alert('account created!!!')


    } else 
    {
        
        alert('An account associated with this email address has already been created.')
    }

    }

function valemail(email) {
    const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!pattern.test(email.trim())) {   // <-- FIXED
        alert("Invalid email address");
        return false;
    }
    return true;
}

function valtele(telephone) {
    const pattern = /^(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
    if (!pattern.test(telephone.trim())) {
        alert("Invalid phone number");
        return false; 
    }
    return true; 
}