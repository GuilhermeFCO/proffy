const Database = require('./db.js')
const createProffy = require('./createProffy.js')


Database.then(async (db) => {
    // Inserir dados
    proffyValue = {
        name: 'Guilherme Fernandes',
        avatar: 'https://avatars1.githubusercontent.com/u/53825689?s=460&u=727440cdbdba89def7cad68fe7e5527809bd2aba&v=4',
        whatsapp: '31999316632',
        bio: 'Entusiasta das melhores tecnologias de química avançada. <br><br> Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por  uma das minhas explosões.',
    }

    classValue = {
        subject: '8',
        cost: '30',
        //o proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        // class_id virá pelo banco de dados, após cadastrarmos a class
        {
            weekday: 2,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ] 

    // await createProffy(db, {proffyValue, classValue, classScheduleValues})
 
    // Consultar dados

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    // consultar as classes de um determinado professor
    // e trazer juntos os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys)

    // o horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    // o horário do time_from (8h) precisa ser menor ou igual ao horário solicitado
    // o time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "1221"
    `)

    console.log(selectClassesSchedules)
})