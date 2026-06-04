"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useTeachers from "@/features/teacher/hooks/use-teachers";
import useStudents from "@/features/student/hooks/use-students";
import useSubjects from "@/features/subject/hooks/use-subjects";
import useScores from "@/features/dashboard/score/hooks/use-scores";

// APIs
import { createTeacher } from "@/features/teacher/api/create-teacher";
import { updateTeacher } from "@/features/teacher/api/update-teacher";
import { deleteTeacher } from "@/features/teacher/api/delete-teacher";
import { createStudent } from "@/features/student/api/create-student";
import { updateStudent } from "@/features/student/api/update-student";
import { deleteStudent } from "@/features/student/api/delete-student";
import { createSubject } from "@/features/subject/api/create-subject";
import { updateSubject } from "@/features/subject/api/update-subject";
import { deleteSubject } from "@/features/subject/api/delete-subject";
import { updateScore } from "@/features/dashboard/score/api/update-score";
import { deleteScore } from "@/features/dashboard/score/api/delete-score";

import { Score } from "@/features/dashboard/score/types/score";

import {
  Shield,
  Users,
  GraduationCap,
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Loader2,
  Search,
  Award,
  TrendingUp,
  BookText,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeroSection from "@/components/hero-section";

type ActiveTab = "overview" | "teachers" | "students" | "subjects" | "scores";

export default function AdminPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");

  // Queries
  const { data: teachersData, isLoading: loadingTeachers } = useTeachers();
  const { data: studentsData, isLoading: loadingStudents } = useStudents();
  const { data: subjectsData, isLoading: loadingSubjects } = useSubjects();
  const { data: scoresData, isLoading: loadingScores } = useScores();

  const teachers = Array.isArray(teachersData) ? teachersData : [];
  const students = Array.isArray(studentsData) ? studentsData : [];
  const subjects = Array.isArray(subjectsData) ? subjectsData : [];
  const scores = Array.isArray(scoresData)
    ? scoresData
    : scoresData
      ? ([scoresData] as unknown as Score[])
      : [];

  // Search terms
  const [searchQuery, setSearchQuery] = useState("");

  // Modals & Forms states
  const [modalType, setModalType] = useState<"add" | "edit" | "delete" | null>(
    null,
  );
  const [targetType, setTargetType] = useState<
    "teacher" | "student" | "subject" | "score" | null
  >(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Form Fields
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formSubjectId, setFormSubjectId] = useState("");
  const [formNisn, setFormNisn] = useState("");
  const [formClass, setFormClass] = useState("");
  const [formNilaiTugas, setFormNilaiTugas] = useState(0);
  const [formNilaiUts, setFormNilaiUts] = useState(0);
  const [formNilaiUas, setFormNilaiUas] = useState(0);

  // Reset all forms
  const resetForm = () => {
    setFormName("");
    setFormEmail("");
    setFormPassword("");
    setFormSubjectId("");
    setFormNisn("");
    setFormClass("");
    setFormNilaiTugas(0);
    setFormNilaiUts(0);
    setFormNilaiUas(0);
    setSelectedItem(null);
    setModalType(null);
    setTargetType(null);
  };

  // Open modals helper
  const openAddModal = (type: "teacher" | "student" | "subject") => {
    resetForm();
    setTargetType(type);
    setModalType("add");
    if (type === "teacher" && subjects.length > 0) {
      setFormSubjectId(subjects[0].id);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openEditModal = (
    type: "teacher" | "student" | "subject" | "score",
    item: any,
  ) => {
    resetForm();
    setSelectedItem(item);
    setTargetType(type);
    setModalType("edit");

    if (type === "teacher") {
      setFormName(item.name);
      setFormSubjectId(item.subjectId);
    } else if (type === "student") {
      setFormName(item.name);
      setFormNisn(item.nisn);
      setFormClass(item.class);
    } else if (type === "subject") {
      setFormName(item.name);
    } else if (type === "score") {
      setFormNilaiTugas(item.nilaiTugas);
      setFormNilaiUts(item.nilaiUts);
      setFormNilaiUas(item.nilaiUas);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openDeleteConfirm = (
    type: "teacher" | "student" | "subject" | "score",
    item: any,
  ) => {
    setSelectedItem(item);
    setTargetType(type);
    setModalType("delete");
  };

  // MUTATIONS
  // Teacher
  const createTeacherMutation = useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      toast.success("Berhasil menambahkan guru");
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      resetForm();
    },
    onError: () => toast.error("Gagal menambahkan guru"),
  });

  const updateTeacherMutation = useMutation({
    mutationFn: updateTeacher,
    onSuccess: () => {
      toast.success("Berhasil memperbarui guru");
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      resetForm();
    },
    onError: () => toast.error("Gagal memperbarui guru"),
  });

  const deleteTeacherMutation = useMutation({
    mutationFn: deleteTeacher,
    onSuccess: () => {
      toast.success("Berhasil menghapus guru");
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      resetForm();
    },
    onError: () => toast.error("Gagal menghapus guru"),
  });

  // Student
  const createStudentMutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      toast.success("Berhasil menambahkan siswa");
      queryClient.invalidateQueries({ queryKey: ["students"] });
      resetForm();
    },
    onError: () => toast.error("Gagal menambahkan siswa"),
  });

  const updateStudentMutation = useMutation({
    mutationFn: updateStudent,
    onSuccess: () => {
      toast.success("Berhasil memperbarui siswa");
      queryClient.invalidateQueries({ queryKey: ["students"] });
      resetForm();
    },
    onError: () => toast.error("Gagal memperbarui siswa"),
  });

  const deleteStudentMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      toast.success("Berhasil menghapus siswa");
      queryClient.invalidateQueries({ queryKey: ["students"] });
      resetForm();
    },
    onError: () => toast.error("Gagal menghapus siswa"),
  });

  // Subject
  const createSubjectMutation = useMutation({
    mutationFn: createSubject,
    onSuccess: () => {
      toast.success("Berhasil menambahkan mata pelajaran");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      resetForm();
    },
    onError: () => toast.error("Gagal menambahkan mata pelajaran"),
  });

  const updateSubjectMutation = useMutation({
    mutationFn: updateSubject,
    onSuccess: () => {
      toast.success("Berhasil memperbarui mata pelajaran");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      resetForm();
    },
    onError: () => toast.error("Gagal memperbarui mata pelajaran"),
  });

  const deleteSubjectMutation = useMutation({
    mutationFn: deleteSubject,
    onSuccess: () => {
      toast.success("Berhasil menghapus mata pelajaran");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      resetForm();
    },
    onError: () => toast.error("Gagal menghapus mata pelajaran"),
  });

  // Score
  const updateScoreMutation = useMutation({
    mutationFn: updateScore,
    onSuccess: () => {
      toast.success("Berhasil memperbarui nilai");
      queryClient.invalidateQueries({ queryKey: ["scores"] });
      resetForm();
    },
    onError: () => toast.error("Gagal memperbarui nilai"),
  });

  const deleteScoreMutation = useMutation({
    mutationFn: deleteScore,
    onSuccess: () => {
      toast.success("Berhasil menghapus nilai");
      queryClient.invalidateQueries({ queryKey: ["scores"] });
      resetForm();
    },
    onError: () => toast.error("Gagal menghapus nilai"),
  });

  // Submit handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (modalType === "add") {
      if (targetType === "teacher") {
        createTeacherMutation.mutate({
          name: formName,
          email: formEmail,
          password: formPassword,
          subjectId: formSubjectId,
        });
      } else if (targetType === "student") {
        createStudentMutation.mutate({
          name: formName,
          nisn: formNisn,
          class: formClass,
          email: formEmail,
          password: formPassword,
        });
      } else if (targetType === "subject") {
        createSubjectMutation.mutate({ name: formName });
      }
    } else if (modalType === "edit") {
      if (targetType === "teacher") {
        updateTeacherMutation.mutate({
          id: selectedItem.id,
          name: formName,
          subjectId: formSubjectId,
        });
      } else if (targetType === "student") {
        updateStudentMutation.mutate({
          id: selectedItem.id,
          name: formName,
          nisn: formNisn,
          class: formClass,
        });
      } else if (targetType === "subject") {
        updateSubjectMutation.mutate({
          id: selectedItem.id,
          name: formName,
        });
      } else if (targetType === "score") {
        updateScoreMutation.mutate({
          id: selectedItem.id,
          nilaiTugas: formNilaiTugas,
          nilaiUts: formNilaiUts,
          nilaiUas: formNilaiUas,
        });
      }
    } else if (modalType === "delete") {
      if (targetType === "teacher") {
        deleteTeacherMutation.mutate(selectedItem.id);
      } else if (targetType === "student") {
        deleteStudentMutation.mutate(selectedItem.id);
      } else if (targetType === "subject") {
        deleteSubjectMutation.mutate(selectedItem.id);
      } else if (targetType === "score") {
        deleteScoreMutation.mutate(selectedItem.id);
      }
    }
  };

  const isLoading =
    loadingTeachers || loadingStudents || loadingSubjects || loadingScores;

  // Filter calculations
  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.subject?.name || "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nisn.includes(searchQuery) ||
      s.class.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredSubjects = subjects.filter((sb) =>
    sb.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredScores = scores.filter(
    (sc) =>
      (sc.student?.name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (sc.subject?.name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (sc.teacher?.name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
      {/* Title Header Banner */}
      <HeroSection
        header="Panel Pengaturan SIPNS"
        description="Kelola entitas pendidikan meliputi data guru, siswa, mata pelajaran, serta semua hasil evaluasi nilai secara terpusat."
        color="red"
      />

      {/* Tabs Headers */}
      <div className="flex border-b border-border/60 overflow-x-auto gap-4 scrollbar-none">
        <button
          onClick={() => {
            setActiveTab("overview");
            setSearchQuery("");
          }}
          className={`pb-4 px-2 font-semibold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "overview"
              ? "border-rose-500 text-rose-600 dark:text-rose-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Ringkasan
        </button>
        <button
          onClick={() => {
            setActiveTab("teachers");
            setSearchQuery("");
          }}
          className={`pb-4 px-2 font-semibold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "teachers"
              ? "border-rose-500 text-rose-600 dark:text-rose-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Kelola Guru
        </button>
        <button
          onClick={() => {
            setActiveTab("students");
            setSearchQuery("");
          }}
          className={`pb-4 px-2 font-semibold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "students"
              ? "border-rose-500 text-rose-600 dark:text-rose-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Kelola Siswa
        </button>
        <button
          onClick={() => {
            setActiveTab("subjects");
            setSearchQuery("");
          }}
          className={`pb-4 px-2 font-semibold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "subjects"
              ? "border-rose-500 text-rose-600 dark:text-rose-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Kelola Mapel
        </button>
        <button
          onClick={() => {
            setActiveTab("scores");
            setSearchQuery("");
          }}
          className={`pb-4 px-2 font-semibold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "scores"
              ? "border-rose-500 text-rose-600 dark:text-rose-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Kelola Nilai
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-rose-500 animate-spin mb-4" />
          <p className="text-muted-foreground text-sm font-medium">
            Memuat data panel admin...
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 1. OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-rose-500/10 to-rose-600/5 border-rose-200/50 dark:border-rose-800/50">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-rose-700 dark:text-rose-400">
                      Total Guru
                    </CardTitle>
                    <Users className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{teachers.length}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tenaga pendidik aktif
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 border-pink-200/50 dark:border-pink-800/50">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-pink-700 dark:text-pink-400">
                      Total Siswa
                    </CardTitle>
                    <GraduationCap className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{students.length}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Siswa aktif terdaftar
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border-indigo-200/50 dark:border-indigo-800/50">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-indigo-700 dark:text-indigo-400">
                      Mata Pelajaran
                    </CardTitle>
                    <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{subjects.length}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Kurikulum pengajaran
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-200/50 dark:border-purple-800/50">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-400">
                      Total Penilaian
                    </CardTitle>
                    <BookText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{scores.length}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Nilai terdata di database
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Summary Report cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-border/50">
                  <CardHeader className="bg-muted/15 border-b border-border/50">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-rose-500" />
                      Statistik Lulus Nilai
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 flex flex-col justify-center items-center text-center space-y-4">
                    <div className="text-5xl font-extrabold text-rose-600">
                      {scores.length > 0
                        ? (
                            (scores.filter((s) => s.statusKelulusan).length /
                              scores.length) *
                            100
                          ).toFixed(0)
                        : "0"}
                      %
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        Rasio Kelulusan Global
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                        Presentase siswa yang memperoleh nilai akhir evaluasi
                        minimal 75 di semua mata pelajaran.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader className="bg-muted/15 border-b border-border/50">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-500" />
                      Nilai Tertinggi Semester Ini
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {scores.length === 0 ? (
                      <div className="py-12 text-center text-sm text-muted-foreground">
                        Belum ada data nilai
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b bg-muted/20 text-xs">
                              <th className="px-4 py-3 text-left">Siswa</th>
                              <th className="px-4 py-3 text-left">Mapel</th>
                              <th className="px-4 py-3 text-center">
                                Nilai Akhir
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/20">
                            {[...scores]
                              .sort((a, b) => b.nilaiAkhir - a.nilaiAkhir)
                              .slice(0, 3)
                              .map((score) => (
                                <tr key={score.id} className="hover:bg-muted/5">
                                  <td className="px-4 py-3 font-medium text-foreground">
                                    {score.student?.name}
                                  </td>
                                  <td className="px-4 py-3 text-muted-foreground">
                                    {score.subject?.name}
                                  </td>
                                  <td className="px-4 py-3 text-center font-bold text-rose-600">
                                    {score.nilaiAkhir}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* 2. GURU (TEACHERS) TAB */}
          {activeTab === "teachers" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Cari nama guru atau mata pelajaran..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 bg-background"
                  />
                </div>
                <button
                  onClick={() => openAddModal("teacher")}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Guru
                </button>
              </div>

              <Card className="border-border/50 overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/30 border-b">
                        <tr>
                          <th className="px-6 py-4 text-left font-semibold text-muted-foreground">
                            Nama Lengkap
                          </th>
                          <th className="px-6 py-4 text-left font-semibold text-muted-foreground">
                            Mata Pelajaran
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-muted-foreground">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/30">
                        {filteredTeachers.length === 0 ? (
                          <tr>
                            <td
                              colSpan={3}
                              className="text-center py-10 text-muted-foreground"
                            >
                              Tidak ada data guru ditemukan
                            </td>
                          </tr>
                        ) : (
                          filteredTeachers.map((teacher) => (
                            <tr
                              key={teacher.id}
                              className="hover:bg-muted/10 transition-colors"
                            >
                              <td className="px-6 py-4 font-medium text-foreground">
                                {teacher.name}
                              </td>
                              <td className="px-6 py-4 text-muted-foreground">
                                {teacher.subject?.name || "Umum"}
                              </td>
                              <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                                <button
                                  onClick={() =>
                                    openEditModal("teacher", teacher)
                                  }
                                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg transition-all"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    openDeleteConfirm("teacher", teacher)
                                  }
                                  className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-all"
                                  title="Hapus"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 3. SISWA (STUDENTS) TAB */}
          {activeTab === "students" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Cari nama, NISN, atau kelas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 bg-background"
                  />
                </div>
                <button
                  onClick={() => openAddModal("student")}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Siswa
                </button>
              </div>

              <Card className="border-border/50 overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/30 border-b">
                        <tr>
                          <th className="px-6 py-4 text-left font-semibold text-muted-foreground">
                            Nama Siswa
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-muted-foreground">
                            NISN
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-muted-foreground">
                            Kelas
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-muted-foreground">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/30">
                        {filteredStudents.length === 0 ? (
                          <tr>
                            <td
                              colSpan={4}
                              className="text-center py-10 text-muted-foreground"
                            >
                              Tidak ada data siswa ditemukan
                            </td>
                          </tr>
                        ) : (
                          filteredStudents.map((student) => (
                            <tr
                              key={student.id}
                              className="hover:bg-muted/10 transition-colors"
                            >
                              <td className="px-6 py-4 font-medium text-foreground">
                                {student.name}
                              </td>
                              <td className="px-6 py-4 text-center font-mono text-xs text-muted-foreground">
                                {student.nisn}
                              </td>
                              <td className="px-6 py-4 text-center text-muted-foreground">
                                {student.class}
                              </td>
                              <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                                <button
                                  onClick={() =>
                                    openEditModal("student", student)
                                  }
                                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg transition-all"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    openDeleteConfirm("student", student)
                                  }
                                  className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-all"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 4. MAPEL (SUBJECTS) TAB */}
          {activeTab === "subjects" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Cari mata pelajaran..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 bg-background"
                  />
                </div>
                <button
                  onClick={() => openAddModal("subject")}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Mapel
                </button>
              </div>

              <Card className="border-border/50 overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/30 border-b">
                        <tr>
                          <th className="px-6 py-4 text-left font-semibold text-muted-foreground">
                            Nama Mata Pelajaran
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-muted-foreground">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/30">
                        {filteredSubjects.length === 0 ? (
                          <tr>
                            <td
                              colSpan={2}
                              className="text-center py-10 text-muted-foreground"
                            >
                              Tidak ada data mapel ditemukan
                            </td>
                          </tr>
                        ) : (
                          filteredSubjects.map((subject) => (
                            <tr
                              key={subject.id}
                              className="hover:bg-muted/10 transition-colors"
                            >
                              <td className="px-6 py-4 font-medium text-foreground">
                                {subject.name}
                              </td>
                              <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                                <button
                                  onClick={() =>
                                    openEditModal("subject", subject)
                                  }
                                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg transition-all"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    openDeleteConfirm("subject", subject)
                                  }
                                  className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-all"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 5. NILAI (SCORES) TAB */}
          {activeTab === "scores" && (
            <div className="space-y-4">
              <div className="flex gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Cari siswa, guru, atau mata pelajaran..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 bg-background"
                  />
                </div>
              </div>

              <Card className="border-border/50 overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/30 border-b">
                        <tr>
                          <th className="px-6 py-4 text-left font-semibold text-muted-foreground">
                            Siswa
                          </th>
                          <th className="px-6 py-4 text-left font-semibold text-muted-foreground">
                            Mata Pelajaran
                          </th>
                          <th className="px-6 py-4 text-left font-semibold text-muted-foreground">
                            Guru
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-muted-foreground">
                            Nilai Akhir
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-muted-foreground">
                            Kelulusan
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-muted-foreground">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/30">
                        {filteredScores.length === 0 ? (
                          <tr>
                            <td
                              colSpan={6}
                              className="text-center py-10 text-muted-foreground"
                            >
                              Tidak ada data nilai ditemukan
                            </td>
                          </tr>
                        ) : (
                          filteredScores.map((score) => (
                            <tr
                              key={score.id}
                              className="hover:bg-muted/10 transition-colors"
                            >
                              <td className="px-6 py-4">
                                <div className="font-medium text-foreground">
                                  {score.student?.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Kelas: {score.student?.class}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-muted-foreground">
                                {score.subject?.name}
                              </td>
                              <td className="px-6 py-4 text-muted-foreground">
                                {score.teacher?.name}
                              </td>
                              <td className="px-6 py-4 text-center font-bold text-rose-600">
                                {score.nilaiAkhir}
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold
                                  ${
                                    score.statusKelulusan
                                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400"
                                      : "bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-400"
                                  }`}
                                >
                                  {score.statusKelulusan
                                    ? "Lulus"
                                    : "Tidak Lulus"}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                                <button
                                  onClick={() => openEditModal("score", score)}
                                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg transition-all"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    openDeleteConfirm("score", score)
                                  }
                                  className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-all"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* OVERLAY MODAL FOR CRUD OPERATIONS */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-background border border-border rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border/40 p-5 bg-muted/30">
              <h3 className="font-bold text-lg text-foreground">
                {modalType === "delete" && "Konfirmasi Hapus"}
                {modalType === "add" &&
                  `Tambah ${targetType === "teacher" ? "Guru" : targetType === "student" ? "Siswa" : "Mata Pelajaran"}`}
                {modalType === "edit" &&
                  `Ubah ${targetType === "teacher" ? "Guru" : targetType === "student" ? "Siswa" : targetType === "subject" ? "Mata Pelajaran" : "Nilai"}`}
              </h3>
              <button
                onClick={resetForm}
                className="p-1 hover:bg-muted rounded-full transition-all text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {modalType === "delete" ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Apakah Anda yakin ingin menghapus data ini secara permanen?
                    Tindakan ini tidak dapat dibatalkan.
                  </p>
                  {selectedItem && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                      <p className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
                        Data yang Dihapus:
                      </p>
                      <p className="font-bold text-sm text-foreground mt-1">
                        {targetType === "score"
                          ? `Nilai ${selectedItem.student?.name} - ${selectedItem.subject?.name}`
                          : selectedItem.name}
                      </p>
                    </div>
                  )}
                  <div className="flex gap-3 justify-end pt-2">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 text-sm font-semibold border rounded-xl hover:bg-muted transition-all"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-semibold bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-all shadow-sm"
                    >
                      Hapus Sekarang
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Common fields for Teacher/Student/Subject ADD & EDIT */}
                  {(targetType === "teacher" ||
                    targetType === "student" ||
                    targetType === "subject") && (
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Contoh: Diana Lestari"
                        className="px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 bg-background"
                      />
                    </div>
                  )}

                  {/* Fields for Adding Teacher or Student (Requires Email & Password) */}
                  {modalType === "add" &&
                    (targetType === "teacher" || targetType === "student") && (
                      <>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Email
                          </label>
                          <input
                            type="email"
                            required
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            placeholder="Contoh: diana@sekolah.com"
                            className="px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 bg-background"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Password
                          </label>
                          <input
                            type="password"
                            required
                            value={formPassword}
                            onChange={(e) => setFormPassword(e.target.value)}
                            placeholder="Password minimal 6 karakter"
                            className="px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 bg-background"
                          />
                        </div>
                      </>
                    )}

                  {/* Teacher specific fields */}
                  {targetType === "teacher" && (
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Mata Pelajaran
                      </label>
                      <select
                        value={formSubjectId}
                        onChange={(e) => setFormSubjectId(e.target.value)}
                        className="px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 bg-background"
                      >
                        {subjects.map((sub) => (
                          <option key={sub.id} value={sub.id}>
                            {sub.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Student specific fields */}
                  {targetType === "student" && (
                    <>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          NISN
                        </label>
                        <input
                          type="text"
                          required
                          value={formNisn}
                          onChange={(e) => setFormNisn(e.target.value)}
                          placeholder="Contoh: 0061234561"
                          className="px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 bg-background"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Kelas
                        </label>
                        <input
                          type="text"
                          required
                          value={formClass}
                          onChange={(e) => setFormClass(e.target.value)}
                          placeholder="Contoh: 12-IPA-1"
                          className="px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 bg-background"
                        />
                      </div>
                    </>
                  )}

                  {/* Score editing fields */}
                  {targetType === "score" && (
                    <>
                      <div className="p-3 bg-muted/40 rounded-xl text-xs space-y-1">
                        <p>
                          <span className="font-semibold text-muted-foreground">
                            Siswa:
                          </span>{" "}
                          {selectedItem?.student?.name}
                        </p>
                        <p>
                          <span className="font-semibold text-muted-foreground">
                            Mapel:
                          </span>{" "}
                          {selectedItem?.subject?.name}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Nilai Tugas
                        </label>
                        <input
                          type="number"
                          required
                          min={0}
                          max={100}
                          value={formNilaiTugas}
                          onChange={(e) =>
                            setFormNilaiTugas(Number(e.target.value))
                          }
                          className="px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 bg-background"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Nilai UTS
                        </label>
                        <input
                          type="number"
                          required
                          min={0}
                          max={100}
                          value={formNilaiUts}
                          onChange={(e) =>
                            setFormNilaiUts(Number(e.target.value))
                          }
                          className="px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 bg-background"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Nilai UAS
                        </label>
                        <input
                          type="number"
                          required
                          min={0}
                          max={100}
                          value={formNilaiUas}
                          onChange={(e) =>
                            setFormNilaiUas(Number(e.target.value))
                          }
                          className="px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 bg-background"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex gap-3 justify-end pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 text-sm font-semibold border rounded-xl hover:bg-muted transition-all"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-semibold bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-all shadow-sm"
                    >
                      Simpan
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
