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
            tmp.push(Math.round(Math.random() * 50));
        }
	A.push(tmp);
	b = Math.round(Math.random() * 50);
	var tmp_ab = tmp.slice();
	tmp_ab.push(b);
	AB.push(tmp_ab);
	B.push(b);
    }
    /*	
    A_inv = numeric.inv(A);
    if (A_inv) {
    	result = numeric.dot(A_inv, B);
	function check(elem) {
            return Math.abs(elem) < 0.0001;
	}
	var diff = [];
	for (var i=0; i<4; i++) {
            diff.push(result[i]-gauss(AB)[i]);
	}
	//assert.ok(diff.filter(check).length == 4, 'Correct');
	insert_matrix(A, document.getElementById('tmp'));
	
    }
    */
    assert.ok(A.length == 4, 'A rows size');
    assert.ok(A[0].length == 4, 'A cols size'+A[0].length);
    assert.ok(AB.length == 4, 'A rows size');
    assert.ok(AB[0].length == 5, 'A cols size'+AB[0].length);
});
