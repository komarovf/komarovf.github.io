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
QUnit.test('insert_matrix(matrix, DOM element)', function ( assert ) {
    A_test = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    elem = document.createElement('div');
    precision = document.createElement('input');
    precision.setAttribute('id', 'precision');
    precision.value = 3;
    insert_matrix(A_test, elem);
    assert.equal(elem.firstChild.rows.length == 4, 'Correct number of rows');
});
