import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default async function ParentsPage() {
  const t = await getTranslations('legal.parentInfo');
  const tCommon = await getTranslations('common');

  const points = [
    t('point0'),
    t('point1'),
    t('point2'),
    t('point3'),
    t('point4'),
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/80 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          {tCommon('nav.home')}
        </Link>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mb-6">
          {t('title')}
        </h1>
        <ul className="space-y-4">
          {points.map((point, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm text-gray-700 dark:text-gray-300"
            >
              <CheckCircleIcon className="w-5 h-5 shrink-0 text-green-500 dark:text-green-400 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
