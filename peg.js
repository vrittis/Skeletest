/*
for class
check that summarize
. is not really beautiful
*/

start =
U:using* NS:test_namespace? SUT:system_under_test
{
	return {
		usings: U,
		namespace: NS,
		testedClass: SUT
	};
}

using = 
_ "using"i ws* ns:namespace _
{
	return {
		namespace : ns
	};
}

test_namespace = 
_ "namespace"i ws* ns:namespace _
{
	return {
		namespace: ns
	};
}

namespace = 
ns:[a-z.]i * 
{
	return ns.join("");
}

system_under_test = 
_ "for"i ws* SUT:[a-z_]i * checks:check*
{
	return {
		className: SUT.join(""),
		Methods: checks
	};
}

check =
_ "check"i ws* "that"i ws* method:[a-z_]i * tests:test*
{
	return {
		methodName: method.join(""),
		tests: tests
	};
}

test = 
_ "." ws* testName:[^"\n"]* _
{
	var changedTestName = testName.join("").replace(/ /g, "_"); 
	return {
		testName: changedTestName, 
		testThrows: changedTestName .indexOf("throws") != -1
	};
}

lb =
"\n"

ws =
[ \t]

_ =
(lb / ws)*