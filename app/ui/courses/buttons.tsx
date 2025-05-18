'use client';

import {PencilIcon, PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {deleteCourse} from '@/app/lib/actions';

export function CreateCourse() {
    return (
        <Link
            href="/dashboard/courses/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            <span className="hidden md:block">Создать курс</span>{' '}
            <PlusIcon className="h-5 md:ml-2"/>
        </Link>
    );
}

export function UpdateCourse({id}: { id: string }) {
    const handleClick = (e: React.MouseEvent) => {
        if (!window.confirm('Вы уверены, что хотите отредактировать данные этого курса?')) {
            e.preventDefault();
        }
    };

    return (
        <Link
            href={`/dashboard/courses/${id}/edit`}
            onClick={handleClick}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5"/>
        </Link>
    );
}

export function DeleteCourse({id}: { id: string }) {
    const deleteCourseWithId = deleteCourse.bind(null, id);

    const handleSubmit = (e: React.FormEvent) => {
        if (!window.confirm('Вы уверены, что хотите удалить этот курс? Это действие нельзя отменить.')) {
            e.preventDefault();
        }
    };

    return (
        <form action={deleteCourseWithId} onSubmit={handleSubmit}>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Удалить</span>
                <TrashIcon className="w-5"/>
            </button>
        </form>
    );
}