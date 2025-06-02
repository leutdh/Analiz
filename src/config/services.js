const Url = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const getGrillaReba = async () => {
    try {
      const response = await fetch(`${Url}/reba/grilla`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching grilla reba:", error);
      throw error;
    }
};

export const getGrillaAdm = async () => {
    try {
      const response = await fetch(`${Url}/adm/grilla`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching grilla adm:", error);
      throw error;
    }
};

export const getGrillaSima = async () => {
    try {
      const response = await fetch(`${Url}/sima/grilla`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching grilla sima:", error);
      throw error;
    }
};
    
    