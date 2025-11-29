import { useEffect, useState } from 'react';
import useTaskStore from '@/store/taskStore';
import useAuthStore from '@/store/authStore';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TaskDialog } from '@/components/TaskDialog';
import { Pencil, Trash2, Plus, Bell } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Toaster, toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const { tasks, fetchTasks, deleteTask, page, pages, isLoading } = useTaskStore();
  const { user } = useAuthStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    fetchTasks(page);
  }, [fetchTasks, page]);

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setTaskToEdit(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        toast.success('Task deleted successfully');
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pages) {
      fetchTasks(newPage);
    }
  };

  return (
    <div className="space-y-8">
      <Toaster position="top-center" richColors />
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
           {/* Placeholder for breadcrumbs or top nav if needed */}
        </div>
        <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="icon" className="rounded-full">
                <Bell className="h-4 w-4" />
            </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">All Tasks</h2>
            <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                <Plus className="mr-2 h-4 w-4" /> Add New Task
            </Button>
        </div>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
            <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent">
                <TableHead className="w-[300px] text-xs font-semibold uppercase tracking-wider text-muted-foreground">Task Title</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Created Date</TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <AnimatePresence mode="popLayout">
                {isLoading ? (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                    Loading...
                    </TableCell>
                </TableRow>
                ) : tasks.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                    No tasks found.
                    </TableCell>
                </TableRow>
                ) : (
                tasks.map((task) => (
                    <motion.tr
                        key={task._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="hover:bg-muted/50 border-b transition-colors data-[state=selected]:bg-muted"
                        style={{ display: 'table-row' }}
                    >
                    <TableCell className="font-medium text-foreground">{task.title}</TableCell>
                    <TableCell className="text-muted-foreground">{task.description}</TableCell>
                    <TableCell>
                        <Badge 
                            variant="outline" 
                            className={`
                                rounded-full px-3 py-0.5 text-xs font-medium border-0
                                ${task.status === 'Completed' 
                                    ? 'bg-green-500/15 text-green-500 hover:bg-green-500/25' 
                                    : 'bg-yellow-500/15 text-yellow-500 hover:bg-yellow-500/25'}
                            `}
                        >
                        {task.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                        {new Date(task.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </TableCell>
                    <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-500/10" onClick={() => handleEdit(task)}>
                            <Pencil className="h-4 w-4" />
                            </Button>
                            {user?.role === 'admin' && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/10" onClick={() => handleDelete(task._id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            )}
                        </div>
                    </TableCell>
                    </motion.tr>
                ))
                )}
                </AnimatePresence>
            </TableBody>
            </Table>
            </div>
        </div>

        {pages > 1 && (
            <div className="flex items-center justify-center space-x-2 py-4">
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
            >
                <span className="sr-only">Previous</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m15 18-6-6 6-6"/></svg>
            </Button>
            <div className="flex items-center gap-1">
                {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                    <Button
                        key={p}
                        variant={page === p ? "default" : "ghost"}
                        size="icon"
                        className={`h-8 w-8 ${page === p ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                        onClick={() => handlePageChange(p)}
                    >
                        {p}
                    </Button>
                ))}
            </div>
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === pages}
            >
                <span className="sr-only">Next</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m9 18 6-6-6-6"/></svg>
            </Button>
            </div>
        )}
      </div>

      <TaskDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        taskToEdit={taskToEdit}
      />
    </div>
  );
};

export default Dashboard;
