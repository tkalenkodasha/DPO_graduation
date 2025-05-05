'use client';

import {StudentForm} from '@/app/lib/definitions';
import {CalendarIcon, EnvelopeIcon, PhoneIcon, PhotoIcon, UserCircleIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {Button} from '@/app/ui/button';
import {updateStudent} from '@/app/lib/actions';
import {useActionState} from 'react';

type SelectOption = { id: string; name: string };

export default function EditStudentForm({
                                            student,
                                            genders,
                                            educations,
                                            categories,
                                            subcategories,
                                        }: {
    student: StudentForm;
    genders: SelectOption[];
    educations: SelectOption[];
    categories: SelectOption[];
    subcategories: SelectOption[];
}) {
    const updateStudentWithId = updateStudent.bind(null, student.id);
    const [state, dispatch] = useActionState(updateStudentWithId, {errors: {}, message: null});

    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Last Name */}
                <div className="mb-4">
                    <label htmlFor="last_name" className="mb-2 block text-sm font-medium">
                        Фамилия *
                    </label>
                    <div className="relative">
                        <input
                            id="last_name"
                            name="last_name"
                            type="text"
                            defaultValue={student.last_name}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            required
                        />
                        <UserCircleIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                    {state.errors?.last_name?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>

                {/* First Name */}
                <div className="mb-4">
                    <label htmlFor="first_name" className="mb-2 block text-sm font-medium">
                        Имя *
                    </label>
                    <div className="relative">
                        <input
                            id="first_name"
                            name="first_name"
                            type="text"
                            defaultValue={student.first_name}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            required
                        />
                        <UserCircleIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                    {state.errors?.first_name?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>

                {/* Middle Name */}
                <div className="mb-4">
                    <label htmlFor="middle_name" className="mb-2 block text-sm font-medium">
                        Отчество (необязательно)
                    </label>
                    <div className="relative">
                        <input
                            id="middle_name"
                            name="middle_name"
                            type="text"
                            defaultValue={student.middle_name}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <UserCircleIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Email *
                    </label>
                    <div className="relative">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={student.email}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <EnvelopeIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                    {state.errors?.email?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>

                {/* Phone */}
                <div className="mb-4">
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                        Телефон (необязательно)
                    </label>
                    <div className="relative">
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            defaultValue={student.phone}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <PhoneIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                </div>

                {/* Date of Birth */}
                <div className="mb-4">
                    <label htmlFor="date_of_birth" className="mb-2 block text-sm font-medium">
                        Дата рождения *
                    </label>
                    <div className="relative">
                        <input
                            id="date_of_birth"
                            name="date_of_birth"
                            type="date"
                            defaultValue={student.date_of_birth}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            required
                        />
                        <CalendarIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                    {state.errors?.date_of_birth?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>

                {/* Gender */}
                <div className="mb-4">
                    <label htmlFor="gender_id" className="mb-2 block text-sm font-medium">
                        Пол *
                    </label>
                    <select
                        id="gender_id"
                        name="gender_id"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                        defaultValue={student.gender_id}
                        required
                    >
                        <option value="">Выберите пол</option>
                        {genders.map((gender) => (
                            <option key={gender.id} value={gender.id}>
                                {gender.name}
                            </option>
                        ))}
                    </select>
                    {state.errors?.gender_id?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>

                {/* Education */}
                <div className="mb-4">
                    <label htmlFor="education_id" className="mb-2 block text-sm font-medium">
                        Образование *
                    </label>
                    <select
                        id="education_id"
                        name="education_id"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                        defaultValue={student.education_id}
                        required
                    >
                        <option value="">Выберите образование</option>
                        {educations.map((education) => (
                            <option key={education.id} value={education.id}>
                                {education.name}
                            </option>
                        ))}
                    </select>
                    {state.errors?.education_id?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label htmlFor="category_id" className="mb-2 block text-sm font-medium">
                        Категория (необязательно)
                    </label>
                    <select
                        id="category_id"
                        name="category_id"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                        defaultValue={student.category_id}
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Subcategory */}
                <div className="mb-4">
                    <label htmlFor="subcategory_id" className="mb-2 block text-sm font-medium">
                        Подкатегория (необязательно)
                    </label>
                    <select
                        id="subcategory_id"
                        name="subcategory_id"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                        defaultValue={student.subcategory_id}
                    >
                        <option value="">Выберите подкатегорию</option>
                        {subcategories.map((subcategory) => (
                            <option key={subcategory.id} value={subcategory.id}>
                                {subcategory.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Passport Series */}
                <div className="mb-4">
                    <label htmlFor="passport_series" className="mb-2 block text-sm font-medium">
                        Серия паспорта (необязательно)
                    </label>
                    <input
                        id="passport_series"
                        name="passport_series"
                        type="text"
                        defaultValue={student.passport_series}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                {/* Passport Number */}
                <div className="mb-4">
                    <label htmlFor="passport_number" className="mb-2 block text-sm font-medium">
                        Номер паспорта (необязательно)
                    </label>
                    <input
                        id="passport_number"
                        name="passport_number"
                        type="text"
                        defaultValue={student.passport_number}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                {/* Issued By */}
                <div className="mb-4">
                    <label htmlFor="issued_by" className="mb-2 block text-sm font-medium">
                        Кем выдан (необязательно)
                    </label>
                    <input
                        id="issued_by"
                        name="issued_by"
                        type="text"
                        defaultValue={student.issued_by}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                {/* Issue Date */}
                <div className="mb-4">
                    <label htmlFor="issue_date" className="mb-2 block text-sm font-medium">
                        Дата выдачи (необязательно)
                    </label>
                    <div className="relative">
                        <input
                            id="issue_date"
                            name="issue_date"
                            type="date"
                            defaultValue={student.issue_date}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <CalendarIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                </div>

                {/* INN */}
                <div className="mb-4">
                    <label htmlFor="inn" className="mb-2 block text-sm font-medium">
                        ИНН (необязательно)
                    </label>
                    <input
                        id="inn"
                        name="inn"
                        type="text"
                        defaultValue={student.inn}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                {/* SNILS */}
                <div className="mb-4">
                    <label htmlFor="snils" className="mb-2 block text-sm font-medium">
                        СНИЛС (необязательно)
                    </label>
                    <input
                        id="snils"
                        name="snils"
                        type="text"
                        defaultValue={student.snils}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                {/* Address */}
                <div className="mb-4">
                    <label htmlFor="address" className="mb-2 block text-sm font-medium">
                        Адрес (необязательно)
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        defaultValue={student.address}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                {/* Postal Code */}
                <div className="mb-4">
                    <label htmlFor="postal_code" className="mb-2 block text-sm font-medium">
                        Почтовый индекс (необязательно)
                    </label>
                    <input
                        id="postal_code"
                        name="postal_code"
                        type="text"
                        defaultValue={student.postal_code}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                {/* Workplace */}
                <div className="mb-4">
                    <label htmlFor="workplace" className="mb-2 block text-sm font-medium">
                        Место работы (необязательно)
                    </label>
                    <input
                        id="workplace"
                        name="workplace"
                        type="text"
                        defaultValue={student.workplace}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                {/* University */}
                <div className="mb-4">
                    <label htmlFor="university" className="mb-2 block text-sm font-medium">
                        Университет (необязательно)
                    </label>
                    <input
                        id="university"
                        name="university"
                        type="text"
                        defaultValue={student.university}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                {/* Position */}
                <div className="mb-4">
                    <label htmlFor="position" className="mb-2 block text-sm font-medium">
                        Должность (необязательно)
                    </label>
                    <input
                        id="position"
                        name="position"
                        type="text"
                        defaultValue={student.position}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                {/* Photo URL */}
                <div className="mb-4">
                    <label htmlFor="photo_url" className="mb-2 block text-sm font-medium">
                        URL фото (необязательно)
                    </label>
                    <div className="relative">
                        <input
                            id="photo_url"
                            name="photo_url"
                            type="text"
                            defaultValue={student.photo_url}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <PhotoIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                </div>
            </div>

            {state.message && (
                <p className="mt-2 text-sm text-red-500">{state.message}</p>
            )}

            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/studentsgrid"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Отмена
                </Link>
                <Button type="submit">Сохранить изменения</Button>
            </div>
        </form>
    );
}