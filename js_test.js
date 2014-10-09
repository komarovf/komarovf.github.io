/*
Tests for functions from gaussian_elimination.js.
I don't know how to test func like insert_matrix(A, element) /: 

*/


QUnit.test('check_value(input field)', function ( assert ) {
    e = document.createElement('input');
    e.setAttribute('type', 'text');
    e.value = '5;
	
    assert.equal(check_value(e), true);
	/*
    ok(check_value('   ') === false, 'Only spaces not accepted');
    equals(check_value('  5'), true, 'Spaces before number - ok');
    equals(check_value('5 '), true, 'Spaces after number - ok');
    equals(check_value('  5  '), true, 'Spaces around number - ok too');
    equals(check_value('5 5'), false, 'Number separated by spaces - not accepted');
    equals(check_value('x5'), false, 'chars not accepted');
	*/
});
/*
QUnit.test("prettydate basics", function( assert ) {
    var now = "2008/01/28 22:25:00";
    assert.equal(prettyDate(now, "2008/01/28 22:24:30"), "just now");
    assert.equal(prettyDate(now, "2008/01/28 22:23:30"), "1 minute ago");
    assert.equal(prettyDate(now, "2008/01/28 21:23:30"), "1 hour ago");
    assert.equal(prettyDate(now, "2008/01/27 22:23:30"), "Yesterday");
    assert.equal(prettyDate(now, "2008/01/26 22:23:30"), "2 days ago");
    assert.equal(prettyDate(now, "2007/01/26 22:23:30"), undefined);
  });
*/
