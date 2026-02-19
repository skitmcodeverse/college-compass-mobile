
-- =============================================
-- ATTENDANCE TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject text NOT NULL,
  date date NOT NULL,
  status text NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  marked_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own attendance" ON public.attendance
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Teachers and HODs can view all attendance" ON public.attendance
  FOR SELECT USING (
    has_role(auth.uid(), 'teacher'::app_role) OR
    has_role(auth.uid(), 'hod'::app_role) OR
    has_role(auth.uid(), 'super_admin'::app_role)
  );

CREATE POLICY "Teachers can insert attendance" ON public.attendance
  FOR INSERT WITH CHECK (
    has_role(auth.uid(), 'teacher'::app_role) OR
    has_role(auth.uid(), 'hod'::app_role) OR
    has_role(auth.uid(), 'super_admin'::app_role)
  );

CREATE POLICY "Teachers can update attendance" ON public.attendance
  FOR UPDATE USING (
    has_role(auth.uid(), 'teacher'::app_role) OR
    has_role(auth.uid(), 'hod'::app_role) OR
    has_role(auth.uid(), 'super_admin'::app_role)
  );

-- =============================================
-- MARKS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.marks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject text NOT NULL,
  exam_type text NOT NULL,
  score numeric NOT NULL,
  max_score numeric NOT NULL DEFAULT 100,
  grade text,
  academic_year text NOT NULL,
  entered_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.marks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own marks" ON public.marks
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Teachers can view all marks" ON public.marks
  FOR SELECT USING (
    has_role(auth.uid(), 'teacher'::app_role) OR
    has_role(auth.uid(), 'hod'::app_role) OR
    has_role(auth.uid(), 'super_admin'::app_role)
  );

CREATE POLICY "Teachers can insert marks" ON public.marks
  FOR INSERT WITH CHECK (
    has_role(auth.uid(), 'teacher'::app_role) OR
    has_role(auth.uid(), 'hod'::app_role) OR
    has_role(auth.uid(), 'super_admin'::app_role)
  );

CREATE POLICY "Teachers can update marks" ON public.marks
  FOR UPDATE USING (
    has_role(auth.uid(), 'teacher'::app_role) OR
    has_role(auth.uid(), 'hod'::app_role) OR
    has_role(auth.uid(), 'super_admin'::app_role)
  );

-- =============================================
-- FEES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.fees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  fee_type text NOT NULL,
  amount numeric NOT NULL,
  due_date date,
  payment_date date,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
  academic_year text NOT NULL,
  receipt_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.fees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own fees" ON public.fees
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Admins can view all fees" ON public.fees
  FOR SELECT USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Admins can insert fees" ON public.fees
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Admins can update fees" ON public.fees
  FOR UPDATE USING (has_role(auth.uid(), 'super_admin'::app_role));

-- =============================================
-- SYLLABUS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.syllabus (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_name text NOT NULL,
  subject_code text NOT NULL,
  units integer NOT NULL DEFAULT 5,
  credits integer NOT NULL DEFAULT 4,
  department text NOT NULL,
  academic_year text NOT NULL,
  file_url text,
  uploaded_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.syllabus ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view syllabus" ON public.syllabus
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Teachers and admins can insert syllabus" ON public.syllabus
  FOR INSERT WITH CHECK (
    has_role(auth.uid(), 'teacher'::app_role) OR
    has_role(auth.uid(), 'hod'::app_role) OR
    has_role(auth.uid(), 'super_admin'::app_role)
  );

CREATE POLICY "Teachers and admins can update syllabus" ON public.syllabus
  FOR UPDATE USING (
    has_role(auth.uid(), 'teacher'::app_role) OR
    has_role(auth.uid(), 'hod'::app_role) OR
    has_role(auth.uid(), 'super_admin'::app_role)
  );

CREATE POLICY "Admins can delete syllabus" ON public.syllabus
  FOR DELETE USING (has_role(auth.uid(), 'super_admin'::app_role));

-- =============================================
-- BUS ROUTES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.bus_routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bus_number text NOT NULL UNIQUE,
  route_name text NOT NULL,
  current_location text,
  estimated_arrival text,
  status text NOT NULL DEFAULT 'on-time' CHECK (status IN ('on-time', 'delayed', 'out-of-service')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.bus_routes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view bus routes" ON public.bus_routes
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage bus routes" ON public.bus_routes
  FOR ALL USING (has_role(auth.uid(), 'super_admin'::app_role));

-- =============================================
-- PLACEMENTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.placements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  position text NOT NULL,
  job_type text NOT NULL DEFAULT 'Full-time',
  location text,
  salary_range text,
  deadline date,
  description text,
  apply_link text,
  posted_by uuid REFERENCES auth.users(id),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.placements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view active placements" ON public.placements
  FOR SELECT USING (auth.uid() IS NOT NULL AND is_active = true);

CREATE POLICY "Teachers and admins can manage placements" ON public.placements
  FOR ALL USING (
    has_role(auth.uid(), 'teacher'::app_role) OR
    has_role(auth.uid(), 'hod'::app_role) OR
    has_role(auth.uid(), 'super_admin'::app_role)
  );

-- =============================================
-- NOTIFICATIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  category text NOT NULL DEFAULT 'announcement',
  target_role text,
  is_read_by uuid[],
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view notifications" ON public.notifications
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Teachers and admins can create notifications" ON public.notifications
  FOR INSERT WITH CHECK (
    has_role(auth.uid(), 'teacher'::app_role) OR
    has_role(auth.uid(), 'hod'::app_role) OR
    has_role(auth.uid(), 'super_admin'::app_role)
  );

CREATE POLICY "Creators can update notifications" ON public.notifications
  FOR UPDATE USING (
    auth.uid() = created_by OR
    has_role(auth.uid(), 'super_admin'::app_role)
  );

-- =============================================
-- NOTES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subject text NOT NULL,
  department text,
  academic_year text,
  file_url text,
  file_type text,
  file_size text,
  uploaded_by uuid REFERENCES auth.users(id),
  uploaded_by_name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view notes" ON public.notes
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Teachers can upload notes" ON public.notes
  FOR INSERT WITH CHECK (
    has_role(auth.uid(), 'teacher'::app_role) OR
    has_role(auth.uid(), 'hod'::app_role) OR
    has_role(auth.uid(), 'super_admin'::app_role)
  );

CREATE POLICY "Teachers can delete own notes" ON public.notes
  FOR DELETE USING (
    auth.uid() = uploaded_by OR
    has_role(auth.uid(), 'super_admin'::app_role)
  );

-- =============================================
-- HOMEWORK TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.homework (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subject text NOT NULL,
  department text,
  academic_year text,
  description text,
  deadline date,
  assigned_by uuid REFERENCES auth.users(id),
  assigned_by_name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.homework ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view homework" ON public.homework
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Teachers can create homework" ON public.homework
  FOR INSERT WITH CHECK (
    has_role(auth.uid(), 'teacher'::app_role) OR
    has_role(auth.uid(), 'hod'::app_role) OR
    has_role(auth.uid(), 'super_admin'::app_role)
  );

CREATE POLICY "Teachers can update own homework" ON public.homework
  FOR UPDATE USING (
    auth.uid() = assigned_by OR
    has_role(auth.uid(), 'super_admin'::app_role)
  );

CREATE POLICY "Teachers can delete own homework" ON public.homework
  FOR DELETE USING (
    auth.uid() = assigned_by OR
    has_role(auth.uid(), 'super_admin'::app_role)
  );

-- =============================================
-- HOMEWORK SUBMISSIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.homework_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  homework_id uuid NOT NULL REFERENCES public.homework(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  submitted_at timestamptz DEFAULT now(),
  file_url text,
  status text NOT NULL DEFAULT 'submitted',
  UNIQUE(homework_id, student_id)
);

ALTER TABLE public.homework_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own submissions" ON public.homework_submissions
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Teachers can view all submissions" ON public.homework_submissions
  FOR SELECT USING (
    has_role(auth.uid(), 'teacher'::app_role) OR
    has_role(auth.uid(), 'hod'::app_role) OR
    has_role(auth.uid(), 'super_admin'::app_role)
  );

CREATE POLICY "Students can submit homework" ON public.homework_submissions
  FOR INSERT WITH CHECK (auth.uid() = student_id);

-- =============================================
-- REPORT ISSUES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.report_issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reported_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  issue_type text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  location text,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in-progress', 'resolved')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.report_issues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own issues" ON public.report_issues
  FOR SELECT USING (auth.uid() = reported_by);

CREATE POLICY "Admins can view all issues" ON public.report_issues
  FOR SELECT USING (
    has_role(auth.uid(), 'hod'::app_role) OR
    has_role(auth.uid(), 'super_admin'::app_role)
  );

CREATE POLICY "Users can report issues" ON public.report_issues
  FOR INSERT WITH CHECK (auth.uid() = reported_by);

CREATE POLICY "Admins can update issue status" ON public.report_issues
  FOR UPDATE USING (
    has_role(auth.uid(), 'hod'::app_role) OR
    has_role(auth.uid(), 'super_admin'::app_role)
  );

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bus_routes;
