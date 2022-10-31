const { db } = require("./db");

async function totalNumOfEmployees() {
    let [data] = await db.query(`
        SELECT COUNT(*) AS total FROM employee_detail
    `)
    console.log("\nRESULT:", data[0].total)
}

async function highestEarningEmployee() {
    let [data] = await db.query(`
        SELECT employee_detail.name, current_job_detail.job_title, MAX(current_job_detail.salary) FROM employee_detail
        JOIN current_job_detail ON employee_detail.employee_id = current_job_detail.employee_id
    `)
    console.log("\nRESULT:", data[0].name, data[0].job_title)
}

async function totalNumOfSeniorDevs() {
    let [data] = await db.query(`
        SELECT COUNT(*) AS total FROM current_job_detail
        WHERE job_title="Senior Developer"
    `)
    console.log("\nRESULT:", data[0].total)
}

async function getWageBrackets() {
    let [data] = await db.query(`
        SELECT job_title, MIN(salary) AS min, MAX(salary) AS max FROM current_job_detail
        GROUP BY job_title
    `)
    console.log("\nRESULT:", data)
}

async function salariesOfNonDevs() {
    let [data] = await db.query(`
        SELECT employee_detail.name, current_job_detail.salary FROM employee_detail
        JOIN current_job_detail ON employee_detail.employee_id = current_job_detail.employee_id
        WHERE current_job_detail.job_title NOT IN ("Developer", "Senior Developer")
    `)
    console.log("\nRESULT:", data)
}

async function main() {
    await totalNumOfEmployees()
    await highestEarningEmployee()
    await totalNumOfSeniorDevs()
    await getWageBrackets()
    await salariesOfNonDevs()
}

main()