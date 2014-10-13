/*
Tests for functions from gaussian_elimination.js.

P.S. Guys! I've never written tests for js before :(
*/

//check_value()
QUnit.test('check_value(input field)', function ( assert ) {
    assert.equal(check_value(''), true, 'Empty field is OK');
    assert.equal(check_value('123'), true, 'Numbers - OK');
    assert.equal(check_value('1e-2'), true, 'Numbers - OK');
    assert.equal(check_value('1.256'), true, 'Numbers - OK');
    assert.equal(check_value('  5'), true, 'Spaces before number - ok');
    assert.equal(check_value('5 '), true, 'Spaces after number - ok');
    assert.equal(check_value('  5  '), true, 'Spaces around number - ok too');
    assert.equal(check_value('   '), false, 'Only spaces not accepted');
    assert.equal(check_value('5 5'), false, 'Number separated by spaces - not accepted');
    assert.equal(check_value('x5'), false, 'chars not accepted');
    assert.equal(check_value('infinity'), false, 'infinity not accepted');
});

//insert_matrix()
QUnit.test('insert_matrix()', function ( assert ) {
    var A_test = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    var div = document.getElementById('tmp');
    div.style.display = 'none';
    var precision = document.createElement('input');
    precision.setAttribute('id', 'precision');
    precision.setAttribute('type', 'text');
    precision.value = '3';
    div.appendChild(precision);
    insert_matrix(A_test, div);
    
    assert.ok(div.children[1].rows.length == A_test.length, 'Correct number of rows');
    assert.ok(div.children[1].rows[0].cells.length == A_test[0].length, 'Correct number of columns');
});

//gauss()
QUnit.test('gauss(matrix)', function ( assert ) {
    var AB = [];
    var A = [];
    var B = [];
    var b;

    for (var i=0; i<4; i++) {
        var tmp = [];
        for (var j=0; j<4; j++) {
            tmp.push(Math.round(Math.random() * 10));
        }
	A.push(tmp);
	b = Math.round(Math.random() * 10);
	var tmp_ab = tmp.slice();
	tmp_ab.push(b);
	AB.push(tmp_ab);
	B.push(b);
    }
    
    if (numeric.det(A) !== 0) {
    	A_inv = numeric.inv(A);
    	result = numeric.dot(A_inv, B);
	function check(elem) {
            return Math.abs(elem) < 0.0001;
	}
	var diff = [];
	var calculated = gauss(AB);
	for (var i=0; i<4; i++) {
            diff.push(result[i]-calculated[i]);
	}
	document.getElementById("results").style.display = "none";
        document.getElementById("res_title").style.display = "none";
        
        if (calculated instanceof Array) {
	    assert.ok(diff.filter(check).length == 4, 'Solving random linear system with numericjs.js. Sometimes fails (The reason - small nubers that shoulb be zeros)');
        }
    }
    
});
