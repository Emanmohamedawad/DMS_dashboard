"use client";
import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";
import Pagination from "./Pagination";

type Order = {
  id: number;
  user: { image: string; name: string; role: string };
  projectName: string;
  team: { images: string[] };
  status: string;
  budget: string;
};

const initialData: Order[] = [
  {
    id: 1,
    user: { image: "/images/user/user-17.jpg", name: "Lindsey Curtis", role: "Web Designer" },
    projectName: "Agency Website",
    team: { images: ["/images/user/user-22.jpg", "/images/user/user-23.jpg", "/images/user/user-24.jpg"] },
    budget: "3.9K",
    status: "Active",
  },
  {
    id: 2,
    user: { image: "/images/user/user-18.jpg", name: "Kaiya George", role: "Project Manager" },
    projectName: "Technology",
    team: { images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"] },
    budget: "24.9K",
    status: "Pending",
  },
  {
    id: 3,
    user: { image: "/images/user/user-17.jpg", name: "Zain Geidt", role: "Content Writing" },
    projectName: "Blog Writing",
    team: { images: ["/images/user/user-27.jpg"] },
    budget: "12.7K",
    status: "Active",
  },
  {
    id: 4,
    user: { image: "/images/user/user-20.jpg", name: "Abram Schleifer", role: "Digital Marketer" },
    projectName: "Social Media",
    team: { images: ["/images/user/user-28.jpg", "/images/user/user-29.jpg", "/images/user/user-30.jpg"] },
    budget: "2.8K",
    status: "Cancel",
  },
  {
    id: 5,
    user: { image: "/images/user/user-21.jpg", name: "Carla George", role: "Front-end Developer" },
    projectName: "Website",
    team: { images: ["/images/user/user-31.jpg", "/images/user/user-32.jpg", "/images/user/user-33.jpg"] },
    budget: "4.5K",
    status: "Active",
  },
  // Duplicate some rows to have more pages
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: 6 + i,
    user: { image: "/images/user/user-17.jpg", name: `User ${6 + i}`, role: "Staff" },
    projectName: `Project ${6 + i}`,
    team: { images: ["/images/user/user-22.jpg"] },
    budget: `${(Math.random() * 30).toFixed(1)}K`,
    status: i % 3 === 0 ? "Active" : i % 3 === 1 ? "Pending" : "Cancel",
  })),
];

const PAGE_SIZES = [5, 10, 20];

export default function AdvancedTable() {
  const [data] = useState<Order[]>(initialData);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof Order | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    let rows = data.filter((r) => {
      if (!term) return true;
      return (
        r.user.name.toLowerCase().includes(term) ||
        r.user.role.toLowerCase().includes(term) ||
        r.projectName.toLowerCase().includes(term) ||
        r.status.toLowerCase().includes(term) ||
        r.budget.toLowerCase().includes(term)
      );
    });

    if (sortBy) {
      rows = rows.sort((a, b) => {
        const av: any = a[sortBy as keyof Order];
        const bv: any = b[sortBy as keyof Order];
        if (typeof av === "string" && typeof bv === "string") {
          return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
        }
        return 0;
      });
    }
    return rows;
  }, [data, search, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const toggleSort = (col: keyof Order) => {
    if (sortBy === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(col);
      setSortDir("asc");
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search..."
            className="w-full sm:w-64 bg-gray-50 rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="bg-gray-50 rounded-lg border border-gray-200 px-2 py-2 text-sm">
            {PAGE_SIZES.map((s) => (
              <option key={s} value={s}>{s} / page</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500">Total: {filtered.length}</div>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer" onClick={() => toggleSort('id')}>
                  # {sortBy === 'id' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer" onClick={() => toggleSort('user')}>
                  User {sortBy === 'user' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer" onClick={() => toggleSort('projectName')}>
                  Project {sortBy === 'projectName' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Team
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400" onClick={() => toggleSort('status')}>
                  Status {sortBy === 'status' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400" onClick={() => toggleSort('budget')}>
                  Budget {sortBy === 'budget' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {pageData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">{order.id}</TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image width={40} height={40} src={order.user.image} alt={order.user.name} />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{order.user.name}</span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">{order.user.role}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{order.projectName}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex -space-x-2">
                      {order.team.images.map((img, idx) => (
                        <div key={idx} className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900">
                          <Image width={24} height={24} src={img} alt={`team ${idx}`} />
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge size="sm" color={order.status === 'Active' ? 'success' : order.status === 'Pending' ? 'warning' : 'error'}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{order.budget}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="p-4 sm:p-6 flex items-center justify-between">
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => setPage(Math.max(1, Math.min(totalPages, p)))} />
        <div className="text-sm text-gray-500">Showing {pageData.length} of {filtered.length}</div>
      </div>
    </div>
  );
}
