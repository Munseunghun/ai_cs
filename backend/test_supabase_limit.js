const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

(async () => {
  console.log('테스트 1: limit 없이 조회');
  const { data: data1, error: error1 } = await supabase
    .from('live_broadcasts')
    .select('*')
    .order('broadcast_date', { ascending: false });
  console.log('결과:', data1?.length, '개');
  
  console.log('\n테스트 2: limit(10000)로 조회');
  const { data: data2, error: error2 } = await supabase
    .from('live_broadcasts')
    .select('*')
    .order('broadcast_date', { ascending: false })
    .limit(10000);
  console.log('결과:', data2?.length, '개');
  
  console.log('\n테스트 3: count로 전체 개수 확인');
  const { count } = await supabase
    .from('live_broadcasts')
    .select('*', { count: 'exact', head: true });
  console.log('전체 개수:', count);
})();
