import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cohcrgzrlylmrvjmcjkb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvaGNyZ3pseWxtcnZqbWNqa2IiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc0Mjc3NzY0NywiZXhwIjoyMDU4MzUzNjQ3fQ.Z6L2pB9pB_V1-icfqmiUwEtxGqu5jF_a1lJwkhJac9wdhdifTt9EdBB0';

export const supabase = createClient(supabaseUrl, supabaseKey);

const api = {
  get: async (path) => {
    if (path === '/applications') {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('appliedAt', { ascending: false });
      
      if (error) {
        console.error("Supabase GET Error:", error);
        throw error;
      }
      return { data };
    }
  },
  
  post: async (path, body) => {
    if (path === '/applications') {
      // Remove any undefined/empty string ID just in case
      const payload = { ...body };
      if (!payload._id) delete payload._id;
      
      const { data, error } = await supabase
        .from('applications')
        .insert([payload])
        .select();
        
      if (error) {
        console.error("Supabase POST Error:", error);
        throw error;
      }
      return { data: data[0] };
    }
  },
  
  put: async (path, body) => {
    if (path.startsWith('/applications/')) {
      const id = path.split('/')[2];
      
      // Never update the primary key
      const payload = { ...body };
      delete payload._id;

      const { data, error } = await supabase
        .from('applications')
        .update(payload)
        .eq('_id', id)
        .select();
        
      if (error) {
        console.error("Supabase PUT Error:", error);
        throw error;
      }
      return { data: data[0] };
    }
  },
  
  delete: async (path) => {
    if (path.startsWith('/applications/')) {
      const id = path.split('/')[2];
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('_id', id);
        
      if (error) {
        console.error("Supabase DELETE Error:", error);
        throw error;
      }
      return { data: { success: true } };
    }
  }
};

export default api;
