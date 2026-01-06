// journey-seed.js - Run this ONCE to populate journey database tables
require('dotenv').config();
const { supabase } = require('./models/db.js');

const JOURNEY_DATA = [
  {
    month: 1,
    title: "Foundation Building",
    milestone: "Establish your digital presence and complete core training",
    tasks: [
      { id: 'linkedin_course', text: 'Complete LinkedIn Warrior Course', time: 120, critical: true },
      { id: 'submit_profile', text: 'Submit LinkedIn profile for audit', time: 30, critical: true },
      { id: 'second_course', text: 'Complete Transformational Leadership Course', time: 180, critical: true },
      { id: 'connect_10', text: 'Connect with 10 new people in your industry', time: 60 },
      { id: 'post_3x', text: 'Announce your T4L Ambassador enrollment on LinkedIn', time: 120 }
    ]
  },
  {
    month: 2,
    title: "Content Creation & Engagement",
    milestone: "Start creating valuable content and engage with community",
    tasks: [
      { id: 'implement_audit', text: 'Implement profile audit recommendations', time: 60, critical: true },
      { id: 'third_course', text: 'Complete Science of You: Personality & Strengths', time: 120, critical: true },
      { id: 'submit_article_1', text: 'Submit your first article idea', time: 45 },
      { id: 'engage_15', text: 'Engage with 15 posts in T4L community', time: 60 }
    ]
  },
  {
    month: 3,
    title: "ENGAGE",
    milestone: "Engaged Member: Attended event, building relationships, consistent content, impact tracked",
    tasks: [
      { id: 'first_event', text: 'Attend your first quarterly networking event', time: 120, critical: true },
      { id: 'transformation_post', text: 'Post transformation update on LinkedIn (90 days)', time: 120 },
      { id: 'submit_article_2', text: 'Submit second article (if first is published)', time: 180 },
      { id: 'update_impact_log', text: 'Update your impact log', time: 30 }
    ]
  },
  {
    month: 4,
    title: "LEAD",
    milestone: "Leadership Activated: Volunteered for opportunity, all courses complete, growing visibility",
    tasks: [
      { id: 'volunteer', text: 'Volunteer for a leadership opportunity', time: 120, critical: true },
      { id: 'complete_courses', text: 'AI Stacking 101', time: 240, critical: true },
      { id: 'request_recommendation', text: 'Request letter of recommendation (if needed)', time: 60 },
      { id: 'post_4x', text: 'Post 4x on LinkedIn this month', time: 120 }
    ]
  },
  {
    month: 5,
    title: "AMPLIFY",
    milestone: "Amplified Impact: Led something, article progress, consistent support",
    tasks: [
      { id: 'lead_something', text: "If you haven't already, lead or co-lead (book club, session, event)", time: 180, critical: true },
      { id: 'check_article', text: 'Check article status and take action', time: 30, critical: true },
      { id: 'daily_engage', text: 'Engage with Ambassadors content daily (5 min/day)', time: 120 },
      { id: 'update_impact_5', text: 'Update impact log', time: 45 }
    ]
  },
  {
    month: 6,
    title: "MIDPOINT",
    milestone: "Halfway Strong: Story shared, podcast scheduled, 50+ people impacted, momentum building",
    tasks: [
      { id: 'quarterly_event_2', text: 'Attend quarterly networking event', time: 120, critical: true },
      { id: 'schedule_podcast', text: 'Schedule your podcast episode', time: 30, critical: true },
      { id: 'halfway_story', text: 'Post your halfway transformation story', time: 120 }
    ]
  },
  {
    month: 7,
    title: "VISIBILITY",
    milestone: "Visible Leader: Podcast prep underway, leading regularly, strong content cadence",
    tasks: [
      { id: 'submit_article_next', text: "Submit next article (if you haven't already)", time: 180 },
      { id: 'lead_second', text: 'Host or lead an opportunity', time: 180 },
      { id: 'post_4x_m7', text: 'Post consistently: 4x this month', time: 120 }
    ]
  },
  {
    month: 8,
    title: "EXPAND",
    milestone: "Expanded Reach: Podcast recorded/scheduled, applied for external opportunities, portfolio growing",
    tasks: [
      { id: 'check_partners', text: 'Check T4L Partners portal weekly', time: 60 },
      { id: 'update_speaker', text: 'Update Speaker Materials', time: 120, critical: true },
      { id: 'speaking_pitch', text: 'Submit speaking pitch (outside T4L)', time: 180 },
      { id: 'update_impact_8', text: 'Update impact log', time: 45 }
    ]
  },
  {
    month: 9,
    title: "CONNECT",
    milestone: "Connected Leader: Deep relationships built, podcast live, third leadership opportunity completed",
    tasks: [
      { id: 'quarterly_event_3', text: 'Attend quarterly networking event', time: 120, critical: true },
      { id: 'follow_up_5', text: 'Follow up with 5 people from event', time: 90, critical: true }
    ]
  },
  {
    month: 10,
    title: "ACCELERATE",
    milestone: "Accelerating: Final articles submitted, 85+ impacted, speaking opportunities in pipeline",
    tasks: [
      { id: 'submit_final', text: 'Submit final articles', time: 180, critical: true },
      { id: 'update_impact_10', text: 'Update impact log', time: 45, critical: true },
      { id: 'apply_speaking', text: 'Apply for 2+ speaking opportunities', time: 180 }
    ]
  },
  {
    month: 11,
    title: "CELEBRATE",
    milestone: "Celebrating: Year documented, story shared, impact quantified",
    tasks: [
      { id: 'quarterly_event_4', text: 'Attend quarterly event', time: 120, critical: true },
      { id: 'final_impact', text: 'Complete final impact log', time: 120, critical: true },
      { id: 'transformation_story', text: 'Post full year transformation story', time: 180 }
    ]
  },
  {
    month: 12,
    title: "RENEW",
    milestone: "Transformation Complete: Full year tracked, portfolio built, thought leadership established, decision made",
    tasks: [
      { id: 'decide_renewal', text: 'Decide on renewal (Top Voices, free tier, or alumni)', time: 60 },
      { id: 'schedule_call', text: 'Schedule renewal call with T4L', time: 30 }
    ]
  }
];

async function seedJourneyData() {
  console.log('🌱 Starting journey database seed...');

  try {
    // Clear existing data
    console.log('🗑️ Clearing existing data...');
    await supabase.from('ambassador_task_completion').delete().neq('completion_id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('ambassador_journey_progress').delete().neq('progress_id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('journey_tasks').delete().neq('task_id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('journey_months').delete().neq('month_id', '00000000-0000-0000-0000-000000000000');

    // Insert months and tasks
    for (const monthData of JOURNEY_DATA) {
      console.log(`\n📅 Processing Month ${monthData.month}: ${monthData.title}`);

      // Insert month
      const { data: month, error: monthError } = await supabase
        .from('journey_months')
        .insert([{
          month_number: monthData.month,
          month_name: monthData.title,
          subtitle: monthData.milestone,
          status_label: monthData.month === 1 ? 'CURRENT' : 'UPCOMING'
        }])
        .select()
        .single();

      if (monthError) {
        console.error(`❌ Error inserting month ${monthData.month}:`, monthError);
        throw monthError;
      }

      console.log(`✅ Month ${monthData.month} created with ID: ${month.month_id}`);

      // Insert tasks for this month
      for (let i = 0; i < monthData.tasks.length; i++) {
        const task = monthData.tasks[i];
        
        const { data: insertedTask, error: taskError } = await supabase
          .from('journey_tasks')
          .insert([{
            month_id: month.month_id,
            task_name: task.text,
            task_description: task.text,
            estimated_time_minutes: task.time || null,
            is_critical: task.critical || false,
            display_order: i + 1
          }])
          .select()
          .single();

        if (taskError) {
          console.error(`❌ Error inserting task "${task.text}":`, taskError);
          throw taskError;
        }

        console.log(`   ✅ Task ${i + 1}/${monthData.tasks.length}: ${task.text}`);
      }
    }

    console.log('\n🎉 Journey database seeded successfully!');
    console.log('📊 Summary:');
    console.log(`   - ${JOURNEY_DATA.length} months created`);
    console.log(`   - ${JOURNEY_DATA.reduce((sum, m) => sum + m.tasks.length, 0)} tasks created`);

  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  }
}

// Run the seed
seedJourneyData()
  .then(() => {
    console.log('\n✅ Seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seed failed:', error);
    process.exit(1);
  });

