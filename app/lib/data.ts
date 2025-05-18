import postgres from 'postgres';
import {
    ContractForm,
    ContractsTable,
    LatestContractRaw,
    LatestStudentRaw,
    StudentField,
    StudentForm,
    StudentsTableType,
    CoursesTableType,
    CourseForm
} from './definitions';


const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

export async function fetchLatestContracts() {
    try {
        const data = await sql<LatestContractRaw[]>`
            SELECT contracts.number,
                   students.last_name,
                   students.first_name,
                   students.middle_name,
                   students.photo_url,
                   students.email,
                   contracts.id
            FROM contracts
                     JOIN students ON contracts.student_id = students.id
            ORDER BY contracts.contract_date DESC LIMIT 5`;

        const latestContracts = data.map((invoice) => ({
            ...invoice,
        }));
        return latestContracts;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest contracts.');
    }
}

export async function fetchLatestStudents() {
    try {
        const data = await sql<LatestStudentRaw[]>`
            SELECT students.last_name,
                   students.first_name,
                   students.middle_name,
                   students.photo_url,
                   students.email
            FROM students
            ORDER BY students.id DESC LIMIT 5`;

        const latestStudentss = data.map((student) => ({
            ...student,
        }));
        return latestStudentss;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest added students.');
    }
}

export async function fetchCardData() {
    try {

        const studentsCountPromise = sql`SELECT COUNT(*)
                                         FROM students;`;
        const contractsCountPromise = sql`SELECT COUNT(*)
                                          FROM contracts;`;
        const coursesCountPromise = sql`SELECT COUNT(*)
                                        FROM courses`;


        const data = await Promise.all([
            studentsCountPromise,
            coursesCountPromise,
            contractsCountPromise,
        ]);

        const numberOfStudents = Number(data[0][0].count ?? '0');
        const numberOfCourses = Number(data[1][0].count ?? '0');
        const numberOfContracts = Number(data[2][0].count ?? '0');

        return {
            numberOfCourses,
            numberOfStudents,
            numberOfContracts,
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}

const ITEMS_PER_PAGE = 4;

export async function fetchFilteredContracts(
    query: string,
    currentPage: number,
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const contracts = await sql<ContractsTable[]>`
            SELECT contracts.id,
                   contracts.number,
                   contracts.contract_date,
                   contracts.enrollment_date,
                   contracts.completion_date,
                   contracts.status,
                   contracts.funding_source_id,

                   students.email,
                   students.photo_url,
                   students.last_name,
                   students.first_name,
                   students.middle_name


            FROM contracts
                     JOIN students ON contracts.student_id = students.id
            WHERE students.last_name ILIKE ${`%${query}%`}
               OR students.email ILIKE ${`%${query}%`}
               OR students.first_name ILIKE ${`%${query}%`}
               OR students.middle_name ILIKE ${`%${query}%`}
               OR contracts.number::text ILIKE ${`%${query}%`}
               OR contracts.contract_date::text ILIKE ${`%${query}%`}
               OR contracts.status ILIKE ${`%${query}%`}
            ORDER BY contracts.contract_date DESC
                LIMIT ${ITEMS_PER_PAGE}
            OFFSET ${offset}
        `;

        return contracts;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch contracts.');
    }
}

export async function fetchFilteredContractsGrid(
    query: string,
) {
    const ITEMS_PER_PAGE = 1000;


    try {
        const contracts = await sql<ContractsTable[]>`
            SELECT contracts.id,
                   contracts.number,
                   contracts.contract_date,
                   contracts.enrollment_date,
                   contracts.completion_date,
                   contracts.status,
                   contracts.other,

                   students.email,
                   students.photo_url,
                   students.last_name,
                   students.first_name,
                   students.middle_name,

                   courses.name         as course_name,
                   funding_sources.name as funding_source_name,
                   contract_types.name  as contract_type_name,
                   programs.name        as program_name

            FROM contracts
                     JOIN students ON contracts.student_id = students.id
                     JOIN courses ON contracts.course_id = courses.id
                     JOIN funding_sources ON contracts.funding_source_id = funding_sources.id
                     JOIN contract_types ON contracts.contract_type_id = contract_types.id
                     LEFT JOIN programs ON courses.program_id = programs.id

            WHERE students.last_name ILIKE ${`%${query}%`}
               OR students.email ILIKE ${`%${query}%`}
               OR students.first_name ILIKE ${`%${query}%`}
               OR students.middle_name ILIKE ${`%${query}%`}
               OR contracts.number::text ILIKE ${`%${query}%`}
               OR contracts.contract_date::text ILIKE ${`%${query}%`}
               OR contracts.status ILIKE ${`%${query}%`}
               OR courses.name ILIKE ${`%${query}%`}
               OR funding_sources.name ILIKE ${`%${query}%`}
               OR programs.name ILIKE ${`%${query}%`}
               OR contracts.other ILIKE ${`%${query}%`}

            ORDER BY contracts.contract_date DESC
                LIMIT ${ITEMS_PER_PAGE}
        `;

        return contracts;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch contracts.');
    }
}

export async function fetchContractsPages(query: string) {
    try {
        const data = await sql`SELECT COUNT(*)
                               FROM contracts
                                        JOIN students ON contracts.student_id = students.id
                               WHERE students.last_name ILIKE ${`%${query}%`}
                                  OR students.email ILIKE ${`%${query}%`}
                                  OR students.first_name ILIKE ${`%${query}%`}
                                  OR students.middle_name ILIKE ${`%${query}%`}
                                  OR contracts.number::text ILIKE ${`%${query}%`}
                                  OR contracts.contract_date::text ILIKE ${`%${query}%`}
                                  OR contracts.status ILIKE ${`%${query}%`}
        `;

        const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of contracts.');
    }
}

export async function fetchContractById(id: string) {
    try {
        const data = await sql<ContractForm[]>`
            SELECT contracts.id,
                   contracts.number,
                   contracts.student_id,
                   contracts.funding_source_id,
                   contracts.contract_type_id,
                   TO_CHAR(contracts.enrollment_date, 'YYYY-MM-DD') AS enrollment_date,
                   TO_CHAR(contracts.completion_date, 'YYYY-MM-DD') AS completion_date,
                   TO_CHAR(contracts.contract_date, 'YYYY-MM-DD')   AS contract_date,
                   contracts.status,
                   contracts.other

            FROM contracts
            WHERE contracts.id = ${id};
        `;

        const contract = data.map((contract) => ({
            ...contract,

        }));
        console.log(contract);
        return contract[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoice.');
    }
}

export async function fetchStudents() {
    try {
        const students = await sql<StudentField[]>`
            SELECT id,
                   last_name,
                   first_name,
                   middle_name
            FROM students
            ORDER BY last_name ASC
        `;

        return students;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all students.');
    }
}

export async function fetchFundingSources() {
    try {
        const fundingSources = await sql<{ id: string; name: string }[]>`
            SELECT id, name
            FROM funding_sources
            ORDER BY name ASC
        `;
        return fundingSources;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch funding sources.');
    }
}

export async function fetchContractTypes() {
    try {
        const contractTypes = await sql<{ id: string; name: string }[]>`
            SELECT id, name
            FROM contract_types
            ORDER BY name ASC
        `;
        return contractTypes;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch contract types.');
    }
}

export async function fetchCourses() {
    try {
        const courses = await sql<{ id: string; name: string }[]>`
            SELECT id, name
            FROM courses
            ORDER BY name ASC
        `;
        return courses;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch courses.');
    }
}

export async function fetchGenders() {
    try {
        const genders = await sql<{ id: string; name: string }[]>`
            SELECT id, name
            FROM genders
            ORDER BY name ASC
        `;
        return genders;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch genders.');
    }
}
export async function fetchPrograms() {
    try {
        const programs = await sql<{ id: string; name: string }[]>`
            SELECT id, name
            FROM programs
            ORDER BY name ASC
        `;
        return programs;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch genders.');
    }
}
export async function fetchEducations() {
    try {
        const educations = await sql<{ id: string; name: string }[]>`
            SELECT id, name
            FROM educations
            ORDER BY name ASC
        `;
        return educations;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch educations.');
    }
}

export async function fetchCategories() {
    try {
        const categories = await sql<{ id: string; name: string }[]>`
            SELECT id, name
            FROM categories
            ORDER BY name ASC
        `;
        return categories;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch categories.');
    }
}

export async function fetchSubcategories(categoryId?: string) {
    try {
        const subcategories = await sql<{ id: string; name: string }[]>`
            SELECT id, name
            FROM subcategories ${categoryId ? sql`WHERE category_id =
            ${categoryId}` : sql``}
            ORDER BY name ASC
        `;
        return subcategories;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch subcategories.');
    }
}

export async function fetchFilteredStudents(query: string, currentPage: number): Promise<StudentsTableType[]> {
    const ITEMS_PER_PAGE = 1000;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const students = await sql<StudentsTableType[]>`
            SELECT s.id,
                   s.last_name,
                   s.first_name,
                   s.middle_name,
                   s.email,
                   s.phone,
                   s.date_of_birth,
                   g.name                              as gender_name,
                   e.name                              as education_name,
                   c.name                              as category_name,
                   sc.name                             as subcategory_name,
                   s.passport_series,
                   s.passport_number,
                   s.issued_by,
                   TO_CHAR(s.issue_date, 'YYYY-MM-DD') AS issue_date,
                   s.inn,
                   s.snils,
                   s.address,
                   s.postal_code,
                   s.workplace,
                   s.university,
                   s.position,
                   s.photo_url,
                   COUNT(con.id)                       as total_contracts
            FROM students s
                     LEFT JOIN genders g ON s.gender_id = g.id
                     LEFT JOIN educations e ON s.education_id = e.id
                     LEFT JOIN categories c ON s.category_id = c.id
                     LEFT JOIN subcategories sc ON s.subcategory_id = sc.id
                     LEFT JOIN contracts con ON s.id = con.student_id
            WHERE s.last_name ILIKE ${`%${query}%`}
               OR s.first_name ILIKE ${`%${query}%`}
               OR s.email ILIKE ${`%${query}%`}
               OR s.phone ILIKE ${`%${query}%`}
               OR s.date_of_birth::text ILIKE ${`%${query}%`}
               OR g.name ILIKE ${`%${query}%`}
               OR e.name ILIKE ${`%${query}%`}
               OR c.name ILIKE ${`%${query}%`}
               OR sc.name ILIKE ${`%${query}%`}
               OR ${`%${query}%`}
            GROUP BY
                s.id, s.last_name, s.first_name, s.middle_name, s.email, s.phone, s.date_of_birth,
                g.name, e.name, c.name, sc.name, s.passport_series, s.passport_number, s.issued_by,
                s.issue_date, s.inn, s.snils, s.address, s.postal_code, s.workplace, s.university,
                s.position, s.photo_url
            ORDER BY s.last_name ASC
                LIMIT ${ITEMS_PER_PAGE}
            OFFSET ${offset}
        `;

        return students;
    } catch (error) {
        console.error('Ошибка базы данных:', error);
        throw new Error('Не удалось загрузить студентов.');
    }
}
export async function fetchStudentById(id: string): Promise<StudentForm | null> {
    try {
        const result = await sql<StudentForm[]>`
            SELECT id,
                   last_name,
                   first_name,
                   middle_name,
                   email,
                   phone,
                   TO_CHAR(date_of_birth, 'YYYY-MM-DD') AS date_of_birth,
                   passport_series,
                   passport_number,
                   issued_by,
                   TO_CHAR(issue_date, 'YYYY-MM-DD')    AS issue_date,
                   inn,
                   snils,
                   address,
                   postal_code,
                   workplace,
                   university,
                   position,
                   gender_id,
                   education_id,
                   category_id,
                   subcategory_id,
                   photo_url
            FROM students
            WHERE id = ${id}
        `;

        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Не удалось загрузить студента.');
    }
}
export async function fetchFilteredCourses(query: string, currentPage: number): Promise<CoursesTableType[]> {
    const ITEMS_PER_PAGE = 1000;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const courses = await sql<CoursesTableType[]>`
            SELECT
                course.id,
                course.name,
                course.academic_hours,
                course.description,
                p.name as program_name
            FROM courses course
                     LEFT JOIN programs p ON course.program_id = p.id
            WHERE
                course.name ILIKE ${`%${query}%`}
               OR course.academic_hours::text ILIKE ${`%${query}%`}
               OR course.description ILIKE ${`%${query}%`}
               OR p.name ILIKE ${`%${query}%`}
            ORDER BY course.name ASC
                LIMIT ${ITEMS_PER_PAGE}
            OFFSET ${offset}
        `;

        return courses;
    } catch (error) {
        console.error('Ошибка базы данных:', error);
        throw new Error('Не удалось загрузить курсы.');
    }
}

export async function fetchCourseById(id: string): Promise<CourseForm | null> {
    try {
        const result = await sql<CourseForm[]>`
            SELECT
                id,
                name,
                academic_hours,
                description,
                program_id
            FROM courses
            WHERE id = ${id}
        `;

        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Не удалось загрузить курс.');
    }
}
{/*-------------------------------------------------------------------------------------------*/}

// Тип для возрастных групп
type AgeGroup = 'under_25' | '25_29' | '30_34' | '35_39' | '40_44' | '45_49' | '50_54' | '55_59' | '60_and_above';

// Тип для данных отчета
interface ReportData {
    gender: string;
    program_type: string;
    count: number;
    age_group: AgeGroup;
}

// Тип для строки результата SQL-запроса
interface ReportRow {
    gender: string;
    program_type: string;
    count: string | number; // COUNT может возвращаться как строка или число
    age_group: string;
}


export async function fetchReportSection24(reportYear: number): Promise<ReportData[]> {
    const referenceDate = `${reportYear + 1}-01-01`;

    try {
        const data = await sql<ReportRow[]>`
            SELECT g.name AS gender,
                   p.name AS program_type,
                   COUNT(DISTINCT s.id) AS count,
                CASE 
                    WHEN EXTRACT(YEAR FROM AGE(${referenceDate}::DATE, s.date_of_birth)) < 25 THEN 'under_25'
                WHEN EXTRACT (YEAR FROM AGE(
                   ${referenceDate}::DATE, s.date_of_birth)) BETWEEN 25 AND 29 THEN '25_29'
                WHEN EXTRACT (YEAR FROM AGE(
                   ${referenceDate}::DATE, s.date_of_birth)) BETWEEN 30 AND 34 THEN '30_34'
                WHEN EXTRACT (YEAR FROM AGE(
                   ${referenceDate}::DATE, s.date_of_birth)) BETWEEN 35 AND 39 THEN '35_39'
                WHEN EXTRACT (YEAR FROM AGE(
                   ${referenceDate}::DATE, s.date_of_birth)) BETWEEN 40 AND 44 THEN '40_44'
                WHEN EXTRACT (YEAR FROM AGE(
                   ${referenceDate}::DATE, s.date_of_birth)) BETWEEN 45 AND 49 THEN '45_49'
                WHEN EXTRACT (YEAR FROM AGE(
                   ${referenceDate}::DATE, s.date_of_birth)) BETWEEN 50 AND 54 THEN '50_54'
                WHEN EXTRACT (YEAR FROM AGE(
                   ${referenceDate}::DATE, s.date_of_birth)) BETWEEN 55 AND 59 THEN '55_59'
                ELSE '60_and_above'
            END
            AS age_group
            FROM students s
            JOIN (
                SELECT DISTINCT student_id
                FROM contracts
                WHERE EXTRACT(YEAR FROM contract_date) = ${reportYear}) c ON s.id = c.student_id 
                JOIN genders g ON s.gender_id = g.id 
                LEFT JOIN contracts co ON s.id = co.student_id 
                AND EXTRACT ( YEAR FROM co.contract_date ) = ${reportYear}
                LEFT JOIN courses crs ON co.course_id = crs.id 
                LEFT JOIN programs p ON crs.program_id = p.id 
                GROUP BY g.name, p.name, age_group
        `;

        return data.map((row) => ({
            gender: row.gender,
            program_type: row.program_type || 'не указано',
            count: Number(row.count),
            age_group: row.age_group as AgeGroup,
        }));
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch report data for Section 2.4.');
    }
}