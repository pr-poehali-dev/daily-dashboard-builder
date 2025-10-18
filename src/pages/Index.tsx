import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [newHabitName, setNewHabitName] = useState('');
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isHabitDialogOpen, setIsHabitDialogOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    toast.success('Статус задачи обновлён');
  };

  const addTask = () => {
    if (!newTaskText.trim()) return;
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
      priority: newTaskPriority as 'high' | 'medium' | 'low'
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
    setNewTaskPriority('medium');
    setIsTaskDialogOpen(false);
    toast.success('Задача добавлена!');
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.success('Задача удалена');
  };

  const incrementHabitStreak = (id: number) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { 
        ...habit, 
        streak: habit.streak + 1,
        progress: Math.min(100, habit.progress + 5)
      } : habit
    ));
    toast.success('🔥 Серия увеличена!');
  };

  const addHabit = () => {
    if (!newHabitName.trim()) return;
    const newHabit = {
      id: Date.now(),
      name: newHabitName,
      streak: 0,
      progress: 0
    };
    setHabits([...habits, newHabit]);
    setNewHabitName('');
    setIsHabitDialogOpen(false);
    toast.success('Привычка добавлена!');
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter(habit => habit.id !== id));
    toast.success('Привычка удалена');
  };

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'tasks', label: 'Задачи', icon: 'CheckSquare' },
    { id: 'calendar', label: 'Календарь', icon: 'Calendar' },
    { id: 'goals', label: 'Цели', icon: 'Target' },
    { id: 'habits', label: 'Привычки', icon: 'TrendingUp' },
    { id: 'notes', label: 'Заметки', icon: 'StickyNote' },
    { id: 'finance', label: 'Финансы', icon: 'Wallet' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' },
  ];

  const [tasks, setTasks] = useState([
    { id: 1, text: 'Утренняя пробежка', completed: true, priority: 'high' },
    { id: 2, text: 'Встреча с командой в 14:00', completed: false, priority: 'medium' },
    { id: 3, text: 'Подготовить презентацию', completed: false, priority: 'high' },
    { id: 4, text: 'Позвонить клиенту', completed: true, priority: 'low' },
  ]);

  const [habits, setHabits] = useState([
    { id: 1, name: 'Медитация', streak: 12, progress: 80 },
    { id: 2, name: 'Чтение', streak: 7, progress: 65 },
    { id: 3, name: 'Спорт', streak: 5, progress: 45 },
    { id: 4, name: 'Вода 2л', streak: 15, progress: 90 },
  ]);

  const goals = [
    { id: 1, title: 'Выучить английский', progress: 45, deadline: '2025-12-31' },
    { id: 2, title: 'Накопить 500 000₽', progress: 67, deadline: '2025-11-01' },
    { id: 3, title: 'Прочитать 24 книги', progress: 33, deadline: '2025-12-31' },
  ];

  const finances = {
    income: 150000,
    expenses: 87500,
    savings: 62500,
    categories: [
      { name: 'Еда', amount: 25000, percent: 28 },
      { name: 'Транспорт', amount: 12000, percent: 14 },
      { name: 'Развлечения', amount: 18500, percent: 21 },
      { name: 'Жильё', amount: 32000, percent: 37 },
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 dark:via-purple-950/10 to-blue-50/30 dark:to-blue-950/10 transition-colors duration-300">
      <div className="container mx-auto p-4 md:p-6 max-w-7xl">
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
              МойЕжедневник
            </h1>
            <p className="text-muted-foreground">Управляй своей жизнью легко и красиво</p>
          </div>
          
          <div className="flex items-center gap-3 glass-card px-4 py-2 rounded-full">
            <Icon name="Sun" size={18} className="text-yellow-500" />
            <Switch checked={isDark} onCheckedChange={toggleTheme} />
            <Icon name="Moon" size={18} className="text-purple-500" />
          </div>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-8">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? 'default' : 'outline'}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col h-20 gap-1 transition-all duration-300 ${
                activeSection === item.id 
                  ? 'gradient-purple text-white shadow-lg scale-105' 
                  : 'hover:scale-105'
              }`}
            >
              <Icon name={item.icon as any} size={20} />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>

        <div className="animate-fade-in">
          {activeSection === 'home' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="glass-card hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="CheckSquare" className="text-purple-500" />
                    Сегодняшние задачи
                  </CardTitle>
                  <CardDescription>Выполнено 2 из 4</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tasks.slice(0, 3).map((task) => (
                      <div key={task.id} className="flex items-center gap-3">
                        <div 
                          onClick={() => toggleTask(task.id)}
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all hover:scale-110 ${
                            task.completed ? 'bg-green-500 border-green-500' : 'border-muted-foreground hover:border-green-400'
                          }`}>
                          {task.completed && <Icon name="Check" size={14} className="text-white" />}
                        </div>
                        <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                          {task.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-pink-500" />
                    Привычки
                  </CardTitle>
                  <CardDescription>Твой прогресс за неделю</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {habits.slice(0, 3).map((habit) => (
                      <div key={habit.id}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{habit.name}</span>
                          <Badge variant="secondary" className="gradient-blue text-white border-0">
                            🔥 {habit.streak} дней
                          </Badge>
                        </div>
                        <Progress value={habit.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Target" className="text-blue-500" />
                    Цели
                  </CardTitle>
                  <CardDescription>Приближайся к мечтам</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {goals.map((goal) => (
                      <div key={goal.id}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-sm">{goal.title}</span>
                          <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card hover:shadow-xl transition-shadow lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Wallet" className="text-green-500" />
                    Финансы
                  </CardTitle>
                  <CardDescription>Обзор за текущий месяц</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 rounded-xl gradient-blue">
                      <div className="text-white/80 text-sm mb-1">Доходы</div>
                      <div className="text-2xl font-bold text-white">{finances.income.toLocaleString()}₽</div>
                    </div>
                    <div className="text-center p-4 rounded-xl gradient-sunset">
                      <div className="text-white/80 text-sm mb-1">Расходы</div>
                      <div className="text-2xl font-bold text-white">{finances.expenses.toLocaleString()}₽</div>
                    </div>
                    <div className="text-center p-4 rounded-xl gradient-purple">
                      <div className="text-white/80 text-sm mb-1">Накопления</div>
                      <div className="text-2xl font-bold text-white">{finances.savings.toLocaleString()}₽</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {finances.categories.map((cat) => (
                      <div key={cat.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{cat.name}</span>
                          <span className="text-sm text-muted-foreground">{cat.amount.toLocaleString()}₽</span>
                        </div>
                        <Progress value={cat.percent} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Calendar" className="text-orange-500" />
                    Сегодня
                  </CardTitle>
                  <CardDescription>{new Date().toLocaleDateString('ru-RU', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                      <Icon name="Coffee" className="text-purple-600" />
                      <div>
                        <div className="font-medium">09:00 - Утренний кофе</div>
                        <div className="text-sm text-muted-foreground">Личное время</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                      <Icon name="Users" className="text-blue-600" />
                      <div>
                        <div className="font-medium">14:00 - Встреча с командой</div>
                        <div className="text-sm text-muted-foreground">Работа</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-pink-100 dark:bg-pink-900/20">
                      <Icon name="Dumbbell" className="text-pink-600" />
                      <div>
                        <div className="font-medium">18:00 - Спортзал</div>
                        <div className="text-sm text-muted-foreground">Здоровье</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'tasks' && (
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="CheckSquare" className="text-purple-500" size={24} />
                      Управление задачами
                    </CardTitle>
                    <CardDescription>Организуй свой день эффективно</CardDescription>
                  </div>
                  <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gradient-purple text-white">
                        <Icon name="Plus" size={18} className="mr-2" />
                        Добавить задачу
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Новая задача</DialogTitle>
                        <DialogDescription>Добавь задачу в свой список</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div>
                          <Input 
                            placeholder="Описание задачи..." 
                            value={newTaskText}
                            onChange={(e) => setNewTaskText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addTask()}
                          />
                        </div>
                        <div>
                          <Select value={newTaskPriority} onValueChange={setNewTaskPriority}>
                            <SelectTrigger>
                              <SelectValue placeholder="Приоритет" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Низкий</SelectItem>
                              <SelectItem value="medium">Средний</SelectItem>
                              <SelectItem value="high">Высокий</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={addTask} className="w-full gradient-purple text-white">
                          Создать задачу
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-4 p-4 rounded-lg border hover:shadow-md transition-shadow group">
                      <div 
                        onClick={() => toggleTask(task.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all hover:scale-110 ${
                          task.completed ? 'bg-green-500 border-green-500' : 'border-muted-foreground hover:border-green-400'
                        }`}>
                        {task.completed && <Icon name="Check" size={16} className="text-white" />}
                      </div>
                      <span className={`flex-1 ${task.completed ? 'line-through text-muted-foreground' : 'font-medium'}`}>
                        {task.text}
                      </span>
                      <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                        {task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => deleteTask(task.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                      >
                        <Icon name="Trash2" size={18} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'calendar' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calendar" className="text-blue-500" size={24} />
                  Календарь событий
                </CardTitle>
                <CardDescription>Планируй наперёд</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Icon name="Calendar" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg text-muted-foreground">Интерактивный календарь в разработке</p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'goals' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Target" className="text-pink-500" size={24} />
                  Мои цели
                </CardTitle>
                <CardDescription>Достигай большего каждый день</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {goals.map((goal) => (
                    <div key={goal.id} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{goal.title}</h3>
                          <p className="text-sm text-muted-foreground">Срок: {new Date(goal.deadline).toLocaleDateString('ru-RU')}</p>
                        </div>
                        <Badge className="gradient-purple text-white border-0">{goal.progress}%</Badge>
                      </div>
                      <Progress value={goal.progress} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'habits' && (
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="TrendingUp" className="text-green-500" size={24} />
                      Трекер привычек
                    </CardTitle>
                    <CardDescription>Формируй полезные привычки</CardDescription>
                  </div>
                  <Dialog open={isHabitDialogOpen} onOpenChange={setIsHabitDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gradient-sunset text-white">
                        <Icon name="Plus" size={18} className="mr-2" />
                        Добавить привычку
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Новая привычка</DialogTitle>
                        <DialogDescription>Начни формировать полезную привычку</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div>
                          <Input 
                            placeholder="Название привычки..." 
                            value={newHabitName}
                            onChange={(e) => setNewHabitName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addHabit()}
                          />
                        </div>
                        <Button onClick={addHabit} className="w-full gradient-sunset text-white">
                          Создать привычку
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {habits.map((habit) => (
                    <div key={habit.id} className="p-6 rounded-xl border hover:shadow-lg transition-shadow group">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-lg">{habit.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="gradient-sunset text-white border-0 text-lg px-3">
                            🔥 {habit.streak}
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => deleteHabit(habit.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                          >
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </div>
                      </div>
                      <Progress value={habit.progress} className="h-3 mb-3" />
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">{habit.progress}% за неделю</p>
                        <Button 
                          size="sm" 
                          onClick={() => incrementHabitStreak(habit.id)}
                          className="gradient-blue text-white"
                        >
                          <Icon name="Plus" size={14} className="mr-1" />
                          Отметить
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'notes' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="StickyNote" className="text-yellow-500" size={24} />
                  Заметки
                </CardTitle>
                <CardDescription>Сохраняй важные мысли</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Icon name="StickyNote" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg text-muted-foreground">Редактор заметок скоро появится</p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'finance' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Wallet" className="text-green-500" size={24} />
                  Финансовый обзор
                </CardTitle>
                <CardDescription>Контролируй свои деньги</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 rounded-2xl gradient-blue shadow-lg">
                    <Icon name="TrendingUp" size={32} className="mx-auto mb-2 text-white" />
                    <div className="text-white/80 text-sm mb-1">Доходы</div>
                    <div className="text-3xl font-bold text-white">{finances.income.toLocaleString()}₽</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl gradient-sunset shadow-lg">
                    <Icon name="TrendingDown" size={32} className="mx-auto mb-2 text-white" />
                    <div className="text-white/80 text-sm mb-1">Расходы</div>
                    <div className="text-3xl font-bold text-white">{finances.expenses.toLocaleString()}₽</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl gradient-purple shadow-lg">
                    <Icon name="PiggyBank" size={32} className="mx-auto mb-2 text-white" />
                    <div className="text-white/80 text-sm mb-1">Накопления</div>
                    <div className="text-3xl font-bold text-white">{finances.savings.toLocaleString()}₽</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg mb-4">Расходы по категориям</h3>
                  {finances.categories.map((cat) => (
                    <div key={cat.name} className="p-4 rounded-lg border">
                      <div className="flex justify-between mb-3">
                        <span className="font-medium">{cat.name}</span>
                        <span className="text-muted-foreground">{cat.amount.toLocaleString()}₽ ({cat.percent}%)</span>
                      </div>
                      <Progress value={cat.percent} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'settings' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Settings" className="text-purple-500" size={24} />
                  Настройки
                </CardTitle>
                <CardDescription>Персонализируй свой дашборд</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h3 className="font-semibold">Тёмная тема</h3>
                      <p className="text-sm text-muted-foreground">Включить ночной режим</p>
                    </div>
                    <Switch checked={isDark} onCheckedChange={toggleTheme} />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border opacity-50">
                    <div>
                      <h3 className="font-semibold">Уведомления</h3>
                      <p className="text-sm text-muted-foreground">Напоминания о задачах</p>
                    </div>
                    <Switch disabled />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border opacity-50">
                    <div>
                      <h3 className="font-semibold">Синхронизация</h3>
                      <p className="text-sm text-muted-foreground">Облачное хранилище</p>
                    </div>
                    <Switch disabled />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;