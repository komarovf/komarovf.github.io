/*
Task:

Solve the system of linear equations using Gaussian elimination (also known as row reduction) with the general element.
Calculate the X vector and vector of errors (E = B-A*X):
 
1*x2 + 3*x3 + 2*x4 = -1;
1000*x1 + 3*x2 + x3 - 5*x4 = -2;
-3*x1 + 4*x2 + x3 + 4*x4 = -1;
4*x1 - 2*x3 - 3*x4 = 4.
 
The program should contain:
1. Displaying the input data (via tables that user allows to modify);
2. Displaying the intermediate solutions;
3. Displaying the X and E vectors;
3. Unit tests for happy and unhappy paths.
 
Additional:
- Result should be reachable via URL (hosted on GitHub pages, deployed to Heroku/Nodejitsu/DigitalOcean, your own private server etc.;
- Source code should be published on your GitHub account and link should be provided to us via e-mail.





Gaussian elimination with the general element explanation from:
http://padaread.com/?book=26512&pg=56
*/


var N = 4;
var DEFAULT_A = [[0, 1, 3, 2, -1], [1000, 3, 1, -5, -2], [-3, 4, 1, 4, -1], [4, 0, -2, -3, 4]];

//Set default values into text fields
function set_values() {
    for (var i=1; i<=N; i++) {
        for (var j=1; j<=N+1; j++) {
            document.getElementById("a_"+i+"_"+j).defaultValue = DEFAULT_A[i-1][j-1];
        }
    }
}

//Get values from text fields
function get_values() {
    var A = new Array();
    for (var i=1; i<=N; i++) {
        A[i-1] = new Array();
        for (var j=1; j<=N+1; j++) {
            elem = document.getElementById("a_"+i+"_"+j).value;
            if (check_value(elem)) {
                A[i-1].push(+elem);
            }
            else {
                alert("Incorrect input data (should be a number)");
                document.getElementById("a_"+i+"_"+j).focus();
                return;
            }
        }
    }
    return A;
}

//Check input value for being number
function check_value(element) {
    if (element.length === 0) {
        return true;
    }
    return !isNaN(parseFloat(element)) && isFinite(element);
}

//Insert table into DOM (append to element) for displaing matrices and vectors
function insert_matrix(A, element) {
    var m = (Array.isArray(A[0])) ? A[0].length : 1;
    var cell, row, table;
    
    var precision = (function() {
        x = document.getElementById("precision").value;
        if (+x !== parseInt(x) || +x < 0 || +x > 10) {
            alert("Incorrect precision!");
            document.getElementById("precision").focus();
            return;
        }
        return +x;
    })();
    
    table = document.createElement('table');
    table.setAttribute("cellspacing", "0");
    for (var i=0; i<N; i++) {
        row = table.insertRow(i);
        for (var j=0; j<m; j++) {
            cell = row.insertCell(j);
            if (m > 1) {
                cell.innerHTML = A[i][j].toFixed(precision).replace("."+Array(precision+1).join("0"), "");
            }
            else {
                if (typeof A[i] !== "undefined") {
                    cell.innerHTML = A[i].toFixed(precision).replace("."+Array(precision+1).join("0"), "");
                }
                else {
                    cell.innerHTML = "Not set";
                }
            }
        }
    }
    element.appendChild(table);
}

//Used for displaying text comments in html view 
function insert_text(text, element) {
    element.innerHTML = element.innerHTML + "<p>" + text + "</p>";
}

//Print text descriptions and matrices for intermediate steps and results
function print_int_res(step, enable, A, B) {
    B = typeof B !== 'undefined' ? B : 0;
    var element = document.getElementById('results');
    var newdiv_1 = document.createElement('div');
    var newdiv_2 = document.createElement('div');
    newdiv_1.setAttribute('class', 'text-matrix');
    insert_text(step, newdiv_1);
    newdiv_2.setAttribute('class', 'text-matrix');
    if (B) {
        insert_text("X = ", newdiv_2);
        insert_matrix(A, newdiv_2);
        insert_text("E = ", newdiv_2);
        insert_matrix(B, newdiv_2);
    }
    else {
        insert_text("(A|B) = ", newdiv_2);
        insert_matrix(A, newdiv_2);
    }
    if (!enable) {
        newdiv_1.style.display = "none";
        newdiv_2.style.display = "none";
    }
    element.appendChild(newdiv_1);
    element.appendChild(newdiv_2);
}

//Clear results from html view
function clear_results() {
    var node = document.getElementById("results");
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
    document.getElementById("results").style.display = "none";
    document.getElementById("res_title").style.display = "none";
    document.getElementById("clear").disabled = true; 
}

//Solve linear system and print results
function gauss(A) {
    if (typeof A === "undefined") {
	    clear_results();
	}
	var A = (typeof A === "undefined") ? get_values() : A;
    var B = new Array();
    var A_buf = A.map(function (matrix) {
        return matrix.slice();
    }); 
    var resolving = "";
    var enable = document.getElementById("inter").checked;
    
    for (var i=0; i<N; i++) {
        B[i] = A[i][N];
    }
    
    //Check for all zeros in (A|B)
    var zeros = true;
    for (var i=0; i<N; i++) {
        for (var j=0; j<N+1; j++) {
            if (A[i][j] !== 0) {
                zeros = false;
            }
        }
    }
    
    print_int_res("Rewrite linear system in matrix form (A|B) and find general element as maximum of abs(A[i][j]):", true, A);
    
    if (zeros) {
        insert_text("Ok, we see all zeros, nothing to do :(", document.getElementById("results"));
        return;
    }
    
    document.getElementById("results").style.display = "block";
    document.getElementById("res_title").style.display = "block";
    document.getElementById("clear").disabled = false;
    
    //General row and col indexes (which contains GE)
    var rows = new Array();
    var cols = new Array();
    
    for (var e=0; e<N; e++) {
        var row, col;
        var general_element = 0;
        
        // Search for general element (max(abs(A[i][j])))
        for (var i=0; i<N; i++) {
            if (rows.indexOf(i) !== -1) {
                continue;
            }
            for (var j=0; j<N; j++) {
                if (cols.indexOf(j) !== -1) {
                    continue;
                }
                if (Math.abs(A[i][j]) >= Math.abs(general_element)) {
                    general_element = A[i][j];
                    row = i;
                    col = j;
                }
            }
        }
        //Check system for resolving
        if (general_element === 0) {
            if (A[row][N] !== 0) {
                resolving = "Linear system unresolvable (rank(A) != rank(A|B))";
            }
        }
        rows.push(row);
        cols.push(col);
        
        if ((e == N-1) || (general_element === 0)) {
            break;
        }
        
        //Getting m_i factors
        var m_i = new Array();
        for (var i=0; i<N; i++) {
            if (i == row) {
                m_i.push(0);
                continue;
            }
            m_i.push(-A[i][col]/general_element);
        }
    
        //Add main_row*factors to other rows (to obtain zeros under and above GE)
        for (var i=0; i<N; i++) {
            if (rows.indexOf(i) !== -1) {
                continue;
            }
            for (var j=0; j<N+1; j++) {
                A[i][j] = A[i][j] + m_i[i] * A[row][j];
            }
            //there can be more detailed output...
        }
        
        print_int_res("General element (GE) is A[" + row + "][" + col + "] (indexes from 0 to 3), \
                       let's make zeros under and above in GE column by making linear combinations of main_row \
                       and other rows (do not examine rows=" + rows + " and columns=" + cols + " in next step):", enable, A);

                       
                       
    }
    
    //Make upper triangular matrix A_t (permutation of rows)
    //*Upper triangular matrix for number of unknown variable x_i
    var A_t = new Array();
    for (var i=0; i<N; i++) {
        if (typeof rows[i] !== "undefined") {
            A_t[i] = A[rows[i]];
        }
        else {
            A_t[i] = [0, 0, 0, 0, 0];
        }
    }
    
    //Do not print some results if A is one-line matrix
    if (rows.length > 1) {
        print_int_res("Forward Elimination is done, let's write our matrix in form where rows with bigger count of zeros placed lower(simply make some permutation of rows):", enable, A_t)
    }
    
    //Check dimension of obtained task (check for x_i that do not appears in equations)
    var variables = new Array();
    for (var i=0; i<N; i++) {
        for (var j=0; j<N; j++) {
            if (typeof variables[j] === "undefined") {
                variables[j] = 0;
            }
            if (A_t[i][j] !== 0) {
                variables[j] = 1;
            }
        }
    }
    var dimension = 0;
    for (var i=0; i<N; i++) {
        if (variables[i] !== 0) {
            dimension += 1;
        }
    }

    //Count zero rows in triangular matrix A_t
    var zero_rows = 0;
    var check = true;
    for (var i=0; i<N; i++) {
        for (var j=0; j<N+1; j++) {
            if (A_t[i][j] !== 0) {
                check = false;
            }
        }
        if (check) {
            zero_rows += 1;
        }
        check = true;
    }

    //Solve system A_t*X=B for upper triangular matrix A_t
    if ((dimension !== (N - zero_rows)) && (resolving === "")) {
        //System have many solutions
        insert_text("System have many solutions with " + (dimension - (N - zero_rows)) + " free variable(s):", document.getElementById("results"));
		return "Many solutions";
    }
    else {
        //System have one solution or unresolvable
        var X = new Array();
        var E = new Array();
        
        //Back substitution
        for (var i=N-1; i>-1; i--) {
            for (var k=0; k<N; k++) {
                if ((A_t[i][k] !== 0) && (typeof X[k] === "undefined")) {
                    X[k] = A_t[i][N]/A_t[i][k];
                    for (var j=i-1; j>-1; j--) {
                        A_t[j][N] -= A_t[j][k]*X[k];
                    }
                }
            }
        }

        //Calc error
        for (var i=0; i<N; i++) {
            E[i] = B[i];
            for (var j=0; j<N; j++) {
                if (typeof X[j] !== "undefined"){
                    E[i] -= A_buf[i][j]*X[j];
                }
            }
        }

        if (resolving !== "Linear system unresolvable (rank(A) != rank(A|B))") {
            print_int_res("Get answer vector X and compute vector of errors E=B-A*X:", true, X, E);
			return X;
        }
        else {
            insert_text(resolving, document.getElementById("results"));
			return "Unresolvable";
        }
    }
}

//Run diff test cases for our task
function test() {
    clear_results();
    //matrices 4x5
    test_cases = [[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
                  [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 3, 0, 5], [0, 0, 0, 0, 0]],
                  [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 3, 0, 5], [0, 0, 0, 0, 4]],
                  [[1, 0, 3, 2, -1], [1000, 3, 1, -5, -2], [-3, 4, 1, 4, -1], [4, 0, -2, -3, 4]],
                  [[1, 0, 3, 2, -1], [1, 0, 3, 2, -1], [-3, 4, 1, 4, -1], [4, 0, -2, -3, 4]],
                  [[4, 0, -2, -3, 4], [1000, 3, 1, -5, -2], [4, 0, -2, -3, 4], [4, 0, -2, -3, 4]],
                  [[1, 0, 3, 2, -1], [1, 0, 3, 2, 2], [-3, 4, 1, 4, -1], [4, 0, -2, -3, 4]],
                  [[0, 0, 1, 2, 3], [0, 0, 3, 2, 1], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
                  [[0, 0, 1, 2, 3], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
                  [[0, 0, 1, 2, 3], [0, 0, 3, 2, 1], [0, 4, 5, 1, 7], [0, 0, 0, 0, 0]]];
                  
    for (var i=0; i<test_cases.length; i++) {
        insert_text("<b>Test #" + (i + 1) + "</b>", document.getElementById("results"));
        gauss(test_cases[i]);
    }
}