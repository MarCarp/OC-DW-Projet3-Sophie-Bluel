const test = await fetch("http://localhost:5678/api/works");
const testok = await test.json();
console.log(testok);
