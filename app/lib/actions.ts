'use server';
import {z} from 'zod';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import postgres from 'postgres';
import {signIn} from '@/auth';
import {AuthError} from 'next-auth';

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});
// Схема для формы создания/редактирования договора
const ContractFormSchema = z.object({
    student_id: z.string({invalid_type_error: 'Пожалуйста, выберите студента.'}),
    contract_type_id: z.string({invalid_type_error: 'Пожалуйста, выберите тип договора.'}),
    funding_source_id: z.string({invalid_type_error: 'Пожалуйста, выберите источник финансирования.'}),
    course_id: z.string({invalid_type_error: 'Пожалуйста, выберите курс.'}),
    number: z.string().min(1, {message: 'Номер договора обязателен.'}),
    enrollment_date: z.string().min(1, {message: 'Дата зачисления обязательна.'}),
    completion_date: z.string().optional(),
    contract_date: z.string().min(1, {message: 'Дата договора обязательна.'}),
    status: z.enum(['Активен', 'Завершен'], {invalid_type_error: 'Пожалуйста, выберите статус.'}),
});

const CreateContract = ContractFormSchema;
const UpdateContract = ContractFormSchema;

export type ContractState = {
    errors?: {
        student_id?: string[];
        contract_type_id?: string[];
        funding_source_id?: string[];
        course_id?: string[];
        number?: string[];
        enrollment_date?: string[];
        completion_date?: string[];
        contract_date?: string[];
        status?: string[];
    };
    message?: string | null;
};

// Создание договора
export async function createContract(state: ContractState, formData: FormData): Promise<ContractState> {
    const validatedFields = CreateContract.safeParse({
        student_id: formData.get('studentId'),
        contract_type_id: formData.get('contractTypeId'),
        funding_source_id: formData.get('fundingSourceId'),
        course_id: formData.get('courseId'),
        number: formData.get('number'),
        enrollment_date: formData.get('enrollmentDate'),
        completion_date: formData.get('completionDate') || null,
        contract_date: formData.get('contractDate'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Отсутствуют обязательные поля. Не удалось создать договор.',
        };
    }

    const {
        student_id,
        contract_type_id,
        funding_source_id,
        course_id,
        number,
        enrollment_date,
        completion_date,
        contract_date,
        status,
    } = validatedFields.data;

    try {
        await sql`
            INSERT INTO contracts (student_id, contract_type_id, funding_source_id, course_id, number,
                                   enrollment_date, completion_date, contract_date, status)
            VALUES (${student_id}, ${contract_type_id}, ${funding_source_id}, ${course_id}, ${number},
                    ${enrollment_date}, ${completion_date ?? null}, ${contract_date}, ${status})
        `;
    } catch (error) {
        console.error('Database Error:', error);
        return {
            message: 'Ошибка базы данных: Не удалось создать договор.',
            errors: {},
        };
    }

    revalidatePath('/dashboard/contracts');
    redirect('/dashboard/contracts');
    return {errors: {}, message: null};
}

// Редактирование договора
export async function updateContract(id: string, formData: FormData) {
    const validatedFields = UpdateContract.safeParse({
        student_id: formData.get('studentId'),
        contract_type_id: formData.get('contractTypeId'),
        funding_source_id: formData.get('fundingSourceId'),
        course_id: formData.get('courseId'),
        number: formData.get('number'),
        enrollment_date: formData.get('enrollmentDate'),
        completion_date: formData.get('completionDate') || null,
        contract_date: formData.get('contractDate'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        throw new Error('Отсутствуют обязательные поля. Не удалось обновить договор.');
    }

    const {
        student_id,
        contract_type_id,
        funding_source_id,
        course_id,
        number,
        enrollment_date,
        completion_date,
        contract_date,
        status
    } = validatedFields.data;

    try {
        await sql`
            UPDATE contracts
            SET student_id        = ${student_id},
                contract_type_id  = ${contract_type_id},
                funding_source_id = ${funding_source_id},
                course_id         = ${course_id},
                number            = ${number},
                enrollment_date   = ${enrollment_date},
                completion_date   = ${completion_date ?? null},
                contract_date     = ${contract_date},
                status            = ${status}
            WHERE id = ${id}
        `;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Ошибка базы данных: Не удалось обновить договор.');
    }

    revalidatePath('/dashboard/contracts');
    redirect('/dashboard/contracts');
}

// Удаление договора
export async function deleteContract(id: string) {
    try {
        await sql`DELETE
                  FROM contracts
                  WHERE id = ${id}`;
        revalidatePath('/dashboard/contracts');
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Ошибка базы данных: Не удалось удалить договор.');
    }
}


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}


const StudentFormSchema = z.object({
    id: z.string(),
    last_name: z.string().min(1, {message: 'Фамилия обязательна'}),
    first_name: z.string().min(1, {message: 'Имя обязательно'}),
    middle_name: z.string().optional(),
    email: z.string().email({message: 'Неверный email'}).optional(),
    phone: z.string().optional(),
    date_of_birth: z.string().min(1, {message: 'Дата рождения обязательна'}),
    gender_id: z.string().min(1, {message: 'Пол обязателен'}),
    education_id: z.string().min(1, {message: 'Образование обязательно'}),
    category_id: z.string().optional(),
    subcategory_id: z.string().optional(),
    passport_series: z.string().optional(),
    passport_number: z.string().optional(),
    issued_by: z.string().optional(),
    issue_date: z.string().refine(
        (val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val),
        { message: 'Дата выдачи должна быть в формате YYYY-MM-DD или пустой' }
    ).optional(),
    inn: z.string().optional(),
    snils: z.string().optional(),
    address: z.string().optional(),
    postal_code: z.string().optional(),
    workplace: z.string().optional(),
    university: z.string().optional(),
    position: z.string().optional(),
    photo_url: z.string().optional(),
});

export type StudentState = {
    errors?: {
        last_name?: string[];
        first_name?: string[];
        middle_name?: string[];
        email?: string[];
        phone?: string[];
        date_of_birth?: string[];
        gender_id?: string[];
        education_id?: string[];
        category_id?: string[];
        subcategory_id?: string[];
        passport_series?: string[];
        passport_number?: string[];
        issued_by?: string[];
        issue_date?: string[];
        inn?: string[];
        snils?: string[];
        address?: string[];
        postal_code?: string[];
        workplace?: string[];
        university?: string[];
        position?: string[];
        photo_url?: string[];
    };
    message?: string | null;
};

const CreateStudent = StudentFormSchema.omit({id: true});
const UpdateStudent = StudentFormSchema.omit({id: true});

export async function createStudent(prevState: StudentState, formData: FormData): Promise<StudentState> {
    const validatedFields = CreateStudent.safeParse({
        last_name: formData.get('last_name'),
        first_name: formData.get('first_name'),
        middle_name: formData.get('middle_name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        date_of_birth: formData.get('date_of_birth'),
        gender_id: formData.get('gender_id'),
        education_id: formData.get('education_id'),
        category_id: formData.get('category_id'),
        subcategory_id: formData.get('subcategory_id'),
        passport_series: formData.get('passport_series'),
        passport_number: formData.get('passport_number'),
        issued_by: formData.get('issued_by'),
        issue_date: formData.get('issue_date'),
        inn: formData.get('inn'),
        snils: formData.get('snils'),
        address: formData.get('address'),
        postal_code: formData.get('postal_code'),
        workplace: formData.get('workplace'),
        university: formData.get('university'),
        position: formData.get('position'),
        photo_url: formData.get('photo_url'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Отсутствуют обязательные поля. Не удалось создать студента.',
        };
    }

    const {
        last_name, first_name, middle_name, email, phone, date_of_birth, gender_id,
        education_id, category_id, subcategory_id, passport_series, passport_number,
        issued_by, issue_date, inn, snils, address, postal_code, workplace, university,
        position, photo_url,
    } = validatedFields.data;
    console.log('Validated fields:', {
        last_name, first_name, middle_name, email, phone, date_of_birth, gender_id,
        education_id, category_id, subcategory_id, passport_series, passport_number,
        issued_by, issue_date, inn, snils, address, postal_code, workplace, university,
        position, photo_url
    });


    const safeIssueDate = issue_date === '' ? null : issue_date;
    const safeCategoryId = category_id === '' ? null : category_id;
    const safeSubcategoryId = subcategory_id === '' ? null : subcategory_id;

    try {
        await sql`
            INSERT INTO students (last_name, first_name, middle_name, email, phone, date_of_birth, gender_id,
                                  education_id, category_id, subcategory_id, passport_series, passport_number,
                                  issued_by, issue_date, inn, snils, address, postal_code, workplace, university,
                                  position, photo_url)
            VALUES (${last_name}, ${first_name}, ${middle_name ?? null}, ${email ?? null}, ${phone ?? null},
                    ${date_of_birth}, ${gender_id}, ${education_id}, ${safeCategoryId?? null}, ${safeSubcategoryId?? null},
                    ${passport_series ?? null}, ${passport_number ?? null}, ${issued_by ?? null}, ${safeIssueDate ?? null},
                    ${inn ?? null}, ${snils ?? null}, ${address ?? null}, ${postal_code ?? null}, ${workplace ?? null},
                    ${university ?? null}, ${position ?? null}, ${photo_url ?? null})
        `;
    } catch (error) {
        console.error('Ошибка базы данных:', error);
        return {
            message: 'Ошибка базы данных: Не удалось создать студента.',
            errors: {},
        };
    }

    revalidatePath('/dashboard/studentsgrid');
    redirect('/dashboard/studentsgrid');
    return {errors: {}, message: null};
}

export async function updateStudent(id: string, prevState: StudentState, formData: FormData): Promise<StudentState> {
    const validatedFields = UpdateStudent.safeParse({
        last_name: formData.get('last_name'),
        first_name: formData.get('first_name'),
        middle_name: formData.get('middle_name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        date_of_birth: formData.get('date_of_birth'),
        gender_id: formData.get('gender_id'),
        education_id: formData.get('education_id'),
        category_id: formData.get('category_id'),
        subcategory_id: formData.get('subcategory_id'),
        passport_series: formData.get('passport_series'),
        passport_number: formData.get('passport_number'),
        issued_by: formData.get('issued_by'),
        issue_date: formData.get('issue_date'),
        inn: formData.get('inn'),
        snils: formData.get('snils'),
        address: formData.get('address'),
        postal_code: formData.get('postal_code'),
        workplace: formData.get('workplace'),
        university: formData.get('university'),
        position: formData.get('position'),
        photo_url: formData.get('photo_url'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Отсутствуют обязательные поля. Не удалось обновить студента.',
        };
    }

    const {
        last_name, first_name, middle_name, email, phone, date_of_birth, gender_id,
        education_id, category_id, subcategory_id, passport_series, passport_number,
        issued_by, issue_date, inn, snils, address, postal_code, workplace, university,
        position, photo_url,
    } = validatedFields.data;

    const safeIssueDate = issue_date === '' ? null : issue_date;
    const safeCategoryId = category_id === '' ? null : category_id;
    const safeSubcategoryId = subcategory_id === '' ? null : subcategory_id;
    try {
        await sql`
            UPDATE students
            SET last_name       = ${last_name},
                first_name      = ${first_name},
                middle_name     = ${middle_name ?? null},
                email           = ${email ?? null},
                phone           = ${phone ?? null},
                date_of_birth   = ${date_of_birth},
                gender_id       = ${gender_id},
                education_id    = ${education_id},
                category_id     = ${safeCategoryId ?? null},
                subcategory_id  = ${safeSubcategoryId ?? null},
                passport_series = ${passport_series ?? null},
                passport_number = ${passport_number ?? null},
                issued_by       = ${issued_by ?? null},
                issue_date      = ${safeIssueDate ?? null},
                inn             = ${inn ?? null},
                snils           = ${snils ?? null},
                address         = ${address ?? null},
                postal_code     = ${postal_code ?? null},
                workplace       = ${workplace ?? null},
                university      = ${university ?? null},
                position        = ${position ?? null},
                photo_url       = ${photo_url ?? null}
            WHERE id = ${id}
        `;
    } catch (error) {
        console.error('Ошибка базы данных:', error);
        return {
            message: 'Ошибка базы данных: Не удалось обновить студента.',
            errors: {},
        };
    }

    revalidatePath('/dashboard/studentsgrid');
    redirect('/dashboard/studentsgrid');
    return {errors: {}, message: null};
}

export async function deleteStudent(id: string) {
    try {
        await sql`DELETE
                  FROM students
                  WHERE id = ${id}`;
        revalidatePath('/dashboard/studentsgrid');
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Ошибка базы данных. Не удалось удалить студента.');
    }
}


// Схема валидации формы курса
const CourseFormSchema = z.object({
    id: z.string(),
    name: z.string().min(1, { message: 'Название курса обязательно' }),
    academic_hours: z.string().min(1, { message: 'Количество часов обязательно' }),
    description: z.string().optional(),
    program_id: z.string().min(1, { message: 'Тип программы обязателен' }),
});

export type CourseState = {
    errors?: {
        name?: string[];
        academic_hours?: string[];
        description?: string[];
        program_id?: string[];
    };
    message?: string | null;
};

const CreateCourse = CourseFormSchema.omit({ id: true });
const UpdateCourse = CourseFormSchema.omit({ id: true });

export async function createCourse(prevState: CourseState, formData: FormData): Promise<CourseState> {
    const validatedFields = CreateCourse.safeParse({
        name: formData.get('name'),
        academic_hours: formData.get('academic_hours'),
        description: formData.get('description'),
        program_id: formData.get('program_id'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Отсутствуют обязательные поля. Не удалось создать курс.',
        };
    }

    const { name, academic_hours, description, program_id } = validatedFields.data;

    try {
        await sql`
            INSERT INTO courses (name, academic_hours, description, program_id)
            VALUES (${name}, ${academic_hours}, ${description || null}, ${program_id})
        `;
    } catch (error) {
        console.error('Ошибка базы данных:', error);
        return {
            message: 'Ошибка базы данных: Не удалось создать курс.',
            errors: {},
        };
    }

    revalidatePath('/dashboard/courses');
    redirect('/dashboard/courses');
    return { errors: {}, message: null };
}

export async function updateCourse(id: string, prevState: CourseState, formData: FormData): Promise<CourseState> {
    const validatedFields = UpdateCourse.safeParse({
        name: formData.get('name'),
        academic_hours: formData.get('academic_hours'),
        description: formData.get('description'),
        program_id: formData.get('program_id'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Отсутствуют обязательные поля. Не удалось обновить курс.',
        };
    }

    const { name, academic_hours, description, program_id } = validatedFields.data;

    try {
        await sql`
            UPDATE courses
            SET name = ${name},
                academic_hours = ${academic_hours},
                description = ${description || null},
                program_id = ${program_id}
            WHERE id = ${id}
        `;
    } catch (error) {
        console.error('Ошибка базы данных:', error);
        return {
            message: 'Ошибка базы данных: Не удалось обновить курс.',
            errors: {},
        };
    }

    revalidatePath('/dashboard/courses');
    redirect('/dashboard/courses');
    return { errors: {}, message: null };
}

export async function deleteCourse(id: string) {
    try {
        await sql`DELETE FROM courses WHERE id = ${id}`;
        revalidatePath('/dashboard/courses');
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Ошибка базы данных. Не удалось удалить курс.');
    }
}