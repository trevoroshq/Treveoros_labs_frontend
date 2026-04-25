'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/lib/auth-context';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: '◈' },
  { href: '/admin/applications', label: 'Applications', icon: '◆' },
  { href: '/admin/payments', label: 'Payments', icon: '₹' },
  { href: '/admin/enrollments', label: 'Enrollments', icon: '⊕' },
  { href: '/admin/batches', label: 'Batches', icon: '⊞' },
  { href: '/admin/performance', label: 'Performance', icon: '⚡' },
  { href: '/admin/certificates', label: 'Certificates', icon: '◎' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="page-loading"><div className="loading-spinner" /></div>;
  }

  if (!user || user.role !== 'ADMIN') return null;

  return (
    <>
      <Navbar />
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div style={{ marginBottom: 24 }}>
            <div className="text-mono" style={{ color: 'var(--color-gray-400)', marginBottom: 4 }}>
              Admin Panel
            </div>
          </div>
          {sidebarLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`admin-sidebar__link ${pathname === link.href ? 'admin-sidebar__link--active' : ''}`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </aside>
        <main className="admin-main">
          {children}
        </main>
      </div>
    </>
  );
}
