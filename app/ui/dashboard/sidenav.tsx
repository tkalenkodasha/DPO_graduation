import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import DpoLogo from '@/app/ui/dpo-logo';
import {PowerIcon} from '@heroicons/react/24/outline';
import {signOut} from '@/auth';

export default function SideNav() {
    return (
        <div className="flex h-full flex-col px-3 py-4 sm:px-3">
            <Link
                className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 sm:h-40"
                href="/"
            >
                <div className="w-32 text-white sm:w-40">
                    <DpoLogo/>
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 sm:flex-col sm:space-x-0 sm:space-y-2">
                <NavLinks/>
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 sm:block"></div>
                <form action={async () => {
                    'use server';
                    await signOut({redirectTo: '/'});
                }}>
                    <button
                        className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 sm:flex-none sm:justify-start sm:p-2 sm:px-3">
                        <PowerIcon className="w-6"/>
                        <div className="hidden sm:block">Выйти</div>
                    </button>
                </form>
            </div>
        </div>
    );
}
