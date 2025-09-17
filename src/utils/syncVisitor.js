import { supabase } from '../supabaseClient';

export async function syncVisitor({
  email,
  status = 'check',
  nom = null,
  prenom = null,
  profil = 'student',
}) {
  const lowerEmail = email.toLowerCase();

  const { data, error } = await supabase
    .from('visitors')
    .upsert(
      [
        {
          email: lowerEmail,
          status,
          nom,
          prenom,
          profil,
          last_visit: new Date(),
        },
      ],
      { onConflict: ['email'] }
    )
    .select();

  if (error) {
    console.error('Erreur Supabase syncVisitor:', error);
    return null;
  }

  // Incrémente visits_count si le visiteur existait déjà
  if (data && data.length > 0 && data[0].visits_count) {
    await supabase
      .from('visitors')
      .update({ visits_count: data[0].visits_count + 1 })
      .eq('email', lowerEmail);
  }

  return data;
}
