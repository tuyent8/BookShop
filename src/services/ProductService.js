import axios from "axios"

export const getAllProducts = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll-Product`)
    return res.data
}

export const getDetailsProduct = async (id) => {
    try {
        console.log('Fetching product details for ID:', id);
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getDetail-Product/${id}`);
        console.log('Product details response:', res.data);
        return res.data;
    } catch (error) {
        console.error('Get product details error:', {
            message: error.message,
            response: error.response?.data
        });
        throw error.response?.data || error;
    }
};

export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
    return res.data

}

export const updateProduct = async (id, data) => {
    try {
        const accessToken = localStorage.getItem('access_token')
        if (!accessToken) {
            throw new Error('No access token found')
        }

        const apiUrl = process.env.REACT_APP_API_URL
        if (!apiUrl) {
            throw new Error('API URL not configured')
        }

        // Log input data
        console.log('Raw update input data:', data)

        // Xử lý dữ liệu theo yêu cầu của backend
        const processedData = {
            name: data.name?.trim(),
            type: data.type?.trim(),
            price: Number(data.price),
            description: data.description?.trim() || '',
            rating: Number(data.rating),
            image: data.image,
            countInStock: data.countInStock || 0,
            discount: data.discount || 0,
            author: data.author?.trim()
        }

        // Log processed data
        console.log('Processed update data:', processedData)

        // Validate theo yêu cầu của backend
        if (!processedData.name) throw new Error('Name is required')
        if (!processedData.type) throw new Error('Type is required')
        if (!processedData.price || isNaN(processedData.price)) throw new Error('Valid price is required')
        if (!processedData.description) throw new Error('Description is required')
        if (!processedData.image) throw new Error('Image is required')
        if (!processedData.rating || isNaN(processedData.rating)) throw new Error('Valid rating is required')

        const config = {
            headers: {
                'Authorization': `Bearer ${JSON.parse(accessToken)}`,
                'Content-Type': 'application/json'
            }
        }

        // Log request details
        console.log('Making update request to:', `${apiUrl}/product/update/${id}`)
        console.log('Update request config:', config)

        const res = await axios.put(`${apiUrl}/product/update/${id}`, processedData, config)

        // Log full response
        console.log('Full update response:', res)

        if (res.data.status === 'ERR') {
            throw new Error(res.data.message || 'Failed to update product')
        }

        return res.data
    } catch (error) {
        console.error('Update error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            requestData: error.config?.data,
            requestHeaders: error.config?.headers,
            requestUrl: error.config?.url
        })
        throw error.response?.data || error
    }
}

export const deleteProduct = async (id) => {
    try {
        const accessToken = JSON.parse(localStorage.getItem('access_token'));
        if (!accessToken) {
            throw new Error('No access token found');
        }

        console.log('Making delete request for product ID:', id);
        console.log('API URL:', `${process.env.REACT_APP_API_URL}/product/deleteProduct/${id}`);

        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/product/deleteProduct/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Delete API response:', response);

        if (response.data?.status === 'ERR') {
            throw new Error(response.data.message || 'Failed to delete product');
        }

        return response.data;
    } catch (error) {
        console.error('Delete request failed:', {
            error: error,
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error.response?.data || error;
    }
};