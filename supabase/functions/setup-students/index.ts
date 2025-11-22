import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.83.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Student {
  enrollmentNumber: string;
  fullName: string;
  branch: string;
  academicYear: string;
  rollNumber: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    console.log('Starting student account creation...');

    // Generate 60 students (20 per year for 2023, 2024, 2025)
    const students: Student[] = [];
    const years = ['23', '24', '25'];
    const yearFull = ['2023', '2024', '2025'];
    
    years.forEach((year, yearIndex) => {
      for (let roll = 1001; roll <= 1020; roll++) {
        const enrollmentNumber = `0875CS${year}${roll}`;
        students.push({
          enrollmentNumber,
          fullName: `Student ${enrollmentNumber}`,
          branch: 'CS',
          academicYear: yearFull[yearIndex],
          rollNumber: roll.toString(),
        });
      }
    });

    console.log(`Generated ${students.length} students`);

    const results = [];
    let successCount = 0;
    let errorCount = 0;

    // Create each student account
    for (const student of students) {
      try {
        const email = `${student.enrollmentNumber}@skitm.edu`;
        const password = 'skitm@123';

        // Create user in auth
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: {
            enrollment_number: student.enrollmentNumber,
            full_name: student.fullName,
          }
        });

        if (authError) {
          console.error(`Error creating auth user for ${student.enrollmentNumber}:`, authError);
          errorCount++;
          results.push({ enrollment: student.enrollmentNumber, status: 'error', error: authError.message });
          continue;
        }

        // Create profile
        const { error: profileError } = await supabaseAdmin
          .from('profiles')
          .insert({
            id: authData.user.id,
            enrollment_number: student.enrollmentNumber,
            full_name: student.fullName,
            branch: student.branch,
            academic_year: student.academicYear,
            roll_number: student.rollNumber,
          });

        if (profileError) {
          console.error(`Error creating profile for ${student.enrollmentNumber}:`, profileError);
          errorCount++;
          results.push({ enrollment: student.enrollmentNumber, status: 'error', error: profileError.message });
          continue;
        }

        // Assign student role
        const { error: roleError } = await supabaseAdmin
          .from('user_roles')
          .insert({
            user_id: authData.user.id,
            role: 'student',
          });

        if (roleError) {
          console.error(`Error assigning role for ${student.enrollmentNumber}:`, roleError);
          errorCount++;
          results.push({ enrollment: student.enrollmentNumber, status: 'error', error: roleError.message });
          continue;
        }

        successCount++;
        results.push({ enrollment: student.enrollmentNumber, status: 'success' });
        console.log(`Successfully created student: ${student.enrollmentNumber}`);

      } catch (error) {
        console.error(`Unexpected error for ${student.enrollmentNumber}:`, error);
        errorCount++;
        results.push({ enrollment: student.enrollmentNumber, status: 'error', error: String(error) });
      }
    }

    console.log(`Setup complete. Success: ${successCount}, Errors: ${errorCount}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Student accounts created. Success: ${successCount}, Errors: ${errorCount}`,
        results,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in setup-students function:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
