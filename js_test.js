/*
Tests for functions from gaussian_elimination.js.
I don't know how to test func like insert_matrix(A, element) /: 

*/


QUnit.test('check_value(input field)', function ( assert ) {
    assert.equal(check_value(''), true, 'Empty field is OK');
    assert.equal(check_value('   '), false, 'Only spaces not accepted');
    assert.equal(check_value('  5'), true, 'Spaces before number - ok');
    assert.equal(check_value('5 '), true, 'Spaces after number - ok');
    assert.equal(check_value('  5  '), true, 'Spaces around number - ok too');
    assert.equal(check_value('5 5'), false, 'Number separated by spaces - not accepted');
    assert.equal(check_value('x5'), false, 'chars not accepted');
});
