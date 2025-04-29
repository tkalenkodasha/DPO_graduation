import {fetchFilteredStudents} from '@/app/lib/data';
import {DeleteStudent, UpdateStudent} from '@/app/ui/students/buttons';

export default async function StudentsTable({
                                                query,
                                                currentPage,
                                            }: {
    query: string;
    currentPage: number;
}) {
    const students = await fetchFilteredStudents(query, currentPage);

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <table className="min-w-full text-gray-900">
                        <thead className="rounded-lg text-left text-sm font-normal">
                        <tr>
                            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                Last Name
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                First Name
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Email
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Phone
                            </th>
                            <th scope="col" className="relative py-3 pl-6 pr-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {students?.map((student) => (
                            <tr
                                key={student.id}
                                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                            >
                                <td className="whitespace-nowrap px-3 py-3">
                                    {student.last_name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {student.first_name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {student.email}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {student.phone}
                                </td>
                                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    <div className="flex justify-end gap-3">
                                        <UpdateStudent id={student.id}/>
                                        <DeleteStudent id={student.id}/>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}