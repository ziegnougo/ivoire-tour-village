export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string | null;
          email: string;
          password_hash: string;
          is_admin: boolean;
          email_verified_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name?: string | null;
          email: string;
          password_hash: string;
          is_admin?: boolean;
          email_verified_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          email?: string;
          password_hash?: string;
          is_admin?: boolean;
          email_verified_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      villages: {
        Row: {
          id: number;
          slug: string;
          nom: string;
          region: string | null;
          resume: string | null;
          histoire: string | null;
          patrimoine: string | null;
          activites: Json;
          hebergements: Json;
          artisans: Json;
          evenements: Json;
          latitude: number | null;
          longitude: number | null;
          image: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          slug: string;
          nom: string;
          region?: string | null;
          resume?: string | null;
          histoire?: string | null;
          patrimoine?: string | null;
          activites?: Json;
          hebergements?: Json;
          artisans?: Json;
          evenements?: Json;
          latitude?: number | null;
          longitude?: number | null;
          image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          slug?: string;
          nom?: string;
          region?: string | null;
          resume?: string | null;
          histoire?: string | null;
          patrimoine?: string | null;
          activites?: Json;
          hebergements?: Json;
          artisans?: Json;
          evenements?: Json;
          latitude?: number | null;
          longitude?: number | null;
          image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      offres: {
        Row: {
          id: number;
          slug: string;
          titre: string;
          village_id: number;
          description: string | null;
          duree: string | null;
          prix: number | null;
          places_disponibles: number | null;
          difficulte: string | null;
          inclus: Json;
          non_inclus: Json;
          image: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          slug: string;
          titre: string;
          village_id: number;
          description?: string | null;
          duree?: string | null;
          prix?: number | null;
          places_disponibles?: number | null;
          difficulte?: string | null;
          inclus?: Json;
          non_inclus?: Json;
          image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          slug?: string;
          titre?: string;
          village_id?: number;
          description?: string | null;
          duree?: string | null;
          prix?: number | null;
          places_disponibles?: number | null;
          difficulte?: string | null;
          inclus?: Json;
          non_inclus?: Json;
          image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "offres_village_id_fkey";
            columns: ["village_id"];
            referencedRelation: "villages";
            referencedColumns: ["id"];
          }
        ];
      };
      reservations: {
        Row: {
          id: number;
          reference: string;
          offre_id: number;
          nom: string;
          email: string;
          date_experience: string;
          nombre_personnes: number;
          prix_total: number;
          statut: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          reference?: string;
          offre_id: number;
          nom: string;
          email: string;
          date_experience: string;
          nombre_personnes: number;
          prix_total: number;
          statut?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          reference?: string;
          offre_id?: number;
          nom?: string;
          email?: string;
          date_experience?: string;
          nombre_personnes?: number;
          prix_total?: number;
          statut?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reservations_offre_id_fkey";
            columns: ["offre_id"];
            referencedRelation: "offres";
            referencedColumns: ["id"];
          }
        ];
      };
      devis_requests: {
        Row: {
          id: number;
          offre_id: number | null;
          nom: string;
          email: string;
          telephone: string | null;
          nombre_personnes: number;
          date_souhaitee: string | null;
          message: string | null;
          statut: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          offre_id?: number | null;
          nom: string;
          email: string;
          telephone?: string | null;
          nombre_personnes: number;
          date_souhaitee?: string | null;
          message?: string | null;
          statut?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          offre_id?: number | null;
          nom?: string;
          email?: string;
          telephone?: string | null;
          nombre_personnes?: number;
          date_souhaitee?: string | null;
          message?: string | null;
          statut?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "devis_requests_offre_id_fkey";
            columns: ["offre_id"];
            referencedRelation: "offres";
            referencedColumns: ["id"];
          }
        ];
      };
      contact_messages: {
        Row: {
          id: number;
          nom: string;
          email: string;
          sujet: string;
          message: string;
          statut: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          nom: string;
          email: string;
          sujet: string;
          message: string;
          statut?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          nom?: string;
          email?: string;
          sujet?: string;
          message?: string;
          statut?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Functions: {
      get_villages: {
        Args: {};
        Returns: {
          id: number;
          slug: string;
          nom: string;
          region: string | null;
          resume: string | null;
          histoire: string | null;
          patrimoine: string | null;
          activites: Json;
          hebergements: Json;
          artisans: Json;
          evenements: Json;
          latitude: number | null;
          longitude: number | null;
          image: string | null;
          created_at: string;
          updated_at: string;
        }[];
      };
    };
  };
}

export type Village = {
  slug: string;
  nom: string;
  region: string | null;
  resume: string | null;
  histoire: string | null;
  patrimoine: string | null;
  activites: string[];
  hebergements: string[];
  artisans: string[];
  evenements: string[];
  coordonnees: { lat: number; lng: number };
  image: string;
};

export type Offre = {
  slug: string;
  titre: string;
  villageSlug: string;
  villageNom: string | null;
  description: string | null;
  duree: string | null;
  prix: number;
  placesDisponibles: number;
  difficulte: "Facile" | "Modéré" | "Difficile";
  inclus: string[];
  nonInclus: string[];
  image: string;
};
