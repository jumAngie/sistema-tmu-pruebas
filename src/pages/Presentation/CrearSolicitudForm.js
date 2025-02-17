import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { FormControl, FormControlLabel, TextField, Modal, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { getCategorias } from "apiServices";
//import { insertarSolicitud } from "apiServices";
import { insertarSolicitud_Temp } from "apiServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MKBadge from "components/MKBadge";
import terminosPDF from "assets/docs/terminosycondiciones.pdf";

function CreateRequestForm() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategorias()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

  const [termsAccepted, setTermsAccepted] = useState(false); // Estado para el checkbox
  const [openModal, setOpenModal] = useState(false); // Estado para el modal
  const [activeTab, setActiveTab] = useState(0);
  const [formValues, setFormValues] = useState({
    titular: "",
    category: "",
    brand: "",
    operationHours: "",
    description: "",
    images: [],
    receipt: null,
    price: "",
    phoneNumber: "",
    additionalPhoneNumber: "",
    email: "",
    client: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // Estado para controlar si el formulario se ha enviado
  const [trackingCode, setTrackingCode] = useState(""); // Estado para el código de rastreo

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCheckboxChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (event, newValue) => {
    setFormValues({ ...formValues, category: newValue });
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...formValues.images];
      newImages[index] = {
        file,
        url: URL.createObjectURL(file),
      };
      setFormValues({ ...formValues, images: newImages });
    }
  };

  const handleReceiptUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues({
        ...formValues,
        receipt: { file, url: URL.createObjectURL(file) }, // Actualiza receipt
      });
    }
  };

  const handleNext = () => {
    if (activeTab < 2) setActiveTab(activeTab + 1);
  };

  const handleBack = () => {
    if (activeTab > 0) setActiveTab(activeTab - 1);
  };

  /* const isFormValid = () => {
    const {
      titular,
      category,
      brand,
      operationHours,
      description,
      images,
      receipt,
      phoneNumber,
      email,
    } = formValues;
    console.log(formValues);
    return (
      titular.trim() &&
      category &&
      brand.trim() &&
      operationHours.trim() &&
      description.trim() &&
      images.length === 4 &&
      receipt &&
      phoneNumber.trim() &&
      email.trim()
    );
  };*/

  const isFormValid_Temp = () => {
    const { titular, category, brand, operationHours, description, images, phoneNumber, email } =
      formValues;

    console.log(formValues);

    return (
      titular.trim() &&
      category &&
      brand.trim() &&
      operationHours.trim() &&
      description.trim() &&
      images.length === 4 && // Solo validamos las 4 imágenes
      phoneNumber.trim() &&
      email.trim()
    );
  };

  const uploadImageToCloudinary = async (image) => {
    const formData = new FormData();
    formData.append("file", image); // Archivo de imagen
    formData.append("upload_preset", "form_upload"); // Tu Upload Preset configurado en Cloudinary
    formData.append("cloud_name", "dg33brioz"); // Tu Cloud Name

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dg33brioz/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      return data.secure_url; // URL segura de la imagen
    } catch (error) {
      console.error("Error al subir la imagen a Cloudinary:", error);
      throw error;
    }
  };

  /* const handleFinish = async (e) => {
    e.preventDefault();

    // Validar términos y condiciones
    if (!termsAccepted) {
      toast.error("Debe aceptar los términos y condiciones para continuar.");
      return;
    } else {
      if (!isFormValid()) {
        toast.error("Debe llenar todos los campos y subir las 5 imágenes requeridas.");
        return;
      } else {
        try {
          const uploadedImages = [];
          for (const image of formValues.images) {
            const imageUrl = await uploadImageToCloudinary(image.file);
            uploadedImages.push(imageUrl);
          }

          console.log(formValues);

          const receiptUrl = await uploadImageToCloudinary(formValues.receipt.file);

          // Enviar datos con imágenes subidas
          const submissionData = {
            titular: formValues.titular,
            category: formValues.category.id, // Debe ser el ID de la categoría
            brand: formValues.brand,
            operationHours: formValues.operationHours,
            description: formValues.description,
            images: uploadedImages, // Array de objetos con la URL de cada imagen
            receipt: { url: receiptUrl }, // Comprobante
            price: formValues.price,
            phoneNumber: formValues.phoneNumber,
            additionalPhoneNumber: formValues.additionalPhoneNumber,
            email: formValues.email,
            client: formValues.client,
          };

          console.log(submissionData);

          // Llamada al backend
          const result = await insertarSolicitud(submissionData);

          // Extraer el ID de la solicitud
          const { solicitudId } = result;

          // Establecer el código de rastreo
          setTrackingCode(solicitudId);
          setIsSubmitted(true);
        } catch (error) {
          toast.error("Hubo un error al procesar el formulario.");
        }
      }
    }
  };*/

  const handleFinish_Temp = async (e) => {
    e.preventDefault();

    // Validar términos y condiciones
    if (!termsAccepted) {
      toast.error("Debe aceptar los términos y condiciones para continuar.");
      return;
    } else {
      if (!isFormValid_Temp()) {
        toast.error("Debe llenar todos los campos y subir las 4 imágenes requeridas.");
        return;
      } else {
        try {
          const uploadedImages = [];
          for (const image of formValues.images) {
            const imageUrl = await uploadImageToCloudinary(image.file);
            uploadedImages.push(imageUrl);
          }

          console.log(formValues);

          // Enviar datos con imágenes subidas SIN el comprobante de pago
          const submissionData = {
            titular: formValues.titular,
            category: formValues.category.id,
            brand: formValues.brand,
            operationHours: formValues.operationHours,
            description: formValues.description,
            images: uploadedImages,
            price: formValues.price,
            phoneNumber: formValues.phoneNumber,
            additionalPhoneNumber: formValues.additionalPhoneNumber,
            email: formValues.email,
            client: formValues.client,
          };

          console.log(submissionData);

          // Llamada al backend usando la nueva función
          const result = await insertarSolicitud_Temp(submissionData);

          // Extraer el ID de la solicitud
          const { solicitudId } = result;

          // Establecer el código de rastreo
          setTrackingCode(solicitudId);
          setIsSubmitted(true);
        } catch (error) {
          toast.error("Hubo un error al procesar el formulario.");
        }
      }
    }
  };

  return (
    <Card
      sx={{
        p: 2,
        mx: { xs: 2, lg: 3 },
        mt: 1,
        mb: 4,
        backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
        backdropFilter: "saturate(200%) blur(30px)",
        boxShadow: ({ boxShadows: { xxl } }) => xxl,
      }}
    >
      {/* Mostrar mensaje de confirmación si el formulario ha sido enviado */}
      {isSubmitted ? (
        <MKBox textAlign="center">
          <MKTypography variant="h2" color="success" mb={2}>
            ¡Su solicitud ha sido recibida!
          </MKTypography>
          <MKTypography variant="h3" color="text.primary" mb={2}>
            Su código de solicitud es: <strong>{trackingCode}</strong>
          </MKTypography>
          <MKTypography variant="h4" color="text.secondary" mb={4}>
            Utilice este código para rastrear el estado de su solicitud. El anuncio de su máquina
            debería estar publicado en un lapso de 3 días, después de verificar que los datos y
            fotos sean correctos.
          </MKTypography>
          {/* Botón para volver */}
          <Box mt={4} textAlign="center">
            <Button
              variant="contained"
              startIcon={<Icon>arrow_back</Icon>}
              sx={{
                backgroundColor: "#1428A0",
                color: "#fff",
                fontSize: { xs: "0.9rem", sm: "1.2rem" },
                padding: { xs: "8px 16px", sm: "12px 24px" },
                "&:hover": {
                  backgroundColor: "#ffff",
                  color: "#1428A0",
                  borderColor: "#1428A0",
                },
              }}
              onClick={() => navigate("/")} // Ruta de vuelta a la página principal
            >
              Volver a la Página Principal
            </Button>
          </Box>
        </MKBox>
      ) : (
        <>
          <Box>
            {/* Contenedor para los textos de pasos y los tabs */}
            <Box display="flex" justifyContent="space-around" mb={1}>
              <Typography variant="subtitle2" color="info.main">
                <strong> PASO #1 </strong>
              </Typography>
              <Typography variant="subtitle2" color="info.main">
                <strong> PASO #2 </strong>
              </Typography>
              <Typography variant="subtitle2" color="info.main">
                <strong> PASO #3 </strong>
              </Typography>
            </Box>

            <Tabs value={activeTab} onChange={handleTabChange} centered>
              <Tab label="Datos del Artículo" />
              <Tab label="Imágenes del Artículo" />
              <Tab label="Datos de Contacto" />
            </Tabs>
          </Box>

          <MKBox mt={2}>
            {activeTab === 0 && (
              <MKBox>
                {/* Datos del Artículo */}
                <FormControl fullWidth margin="normal">
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="Nombre de la Máquina o Titular"
                      name="titular"
                      value={formValues.titular}
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Autocomplete
                    options={categories.map((category) => ({
                      label: category.cat_Nombre,
                      id: category.cat_ID,
                    }))}
                    value={formValues.category}
                    onChange={handleCategoryChange}
                    renderInput={(params) => (
                      <TextField {...params} label="Elija la categoría" variant="outlined" />
                    )}
                  />
                </FormControl>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Marca"
                      name="brand"
                      value={formValues.brand}
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Horas de Operación"
                      name="operationHours"
                      value={formValues.operationHours}
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  label="Breve descripción de la máquina"
                  name="description"
                  value={formValues.description}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  sx={{ mb: 2 }}
                />
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label="Precio HNL (Opcional)"
                    name="price"
                    value={formValues.price}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                </Grid>
              </MKBox>
            )}

            {activeTab === 1 && (
              <MKBox>
                {/* Subida de imágenes */}
                <MKTypography variant="body2" color="text.secondary" mb={2}>
                  RECOMENDACIÓN: Suba una foto clara y bien iluminada, tomada desde varios ángulos.
                  Use un fondo neutro y asegúrese de que la imagen tenga un tamaño mínimo de 800x800
                  píxeles en formato JPG o PNG, con un peso máximo de 5 MB.
                </MKTypography>
                <Grid container spacing={2}>
                  {[...Array(4)].map((_, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <input
                        accept="image/*"
                        type="file"
                        onChange={(e) => handleImageUpload(e, index)}
                        style={{ display: "none" }}
                        id={`image-upload-${index}`}
                      />
                      <label htmlFor={`image-upload-${index}`}>
                        <MKButton
                          component="span"
                          variant="outlined"
                          color="info"
                          fullWidth
                          sx={{
                            height: "250px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                          }}
                        >
                          {formValues.images[index] ? (
                            <img
                              src={formValues.images[index].url}
                              alt={`Preview ${index}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                borderRadius: "4px",
                              }}
                            />
                          ) : (
                            "Subir imagen"
                          )}
                        </MKButton>
                      </label>
                    </Grid>
                  ))}
                </Grid>
                {/* Contenedor para el comprobante de pago */}
                <MKBox mt={4}>
                  <MKTypography variant="h6" color="error" mb={2}>
                    Subir Comprobante de Pago (Obligatorio)
                  </MKTypography>
                  <MKBadge
                    badgeContent="DESHABILITADO TEMPORALMENTE"
                    variant="contained"
                    color="info"
                    container
                    circular
                    sx={{
                      mb: 1,
                    }}
                  />
                  <MKBox>
                    <input
                      accept="image/*"
                      type="file"
                      onChange={handleReceiptUpload}
                      style={{ display: "none" }}
                      id="receipt-upload"
                    />
                    <label htmlFor="receipt-upload">
                      <MKButton
                        component="span"
                        variant="outlined"
                        color="info"
                        fullWidth
                        sx={{
                          height: "250px", // Ajusta el tamaño según sea necesario
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        {formValues.receipt ? (
                          <img
                            src={formValues.receipt.url}
                            alt="Receipt Preview"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                              borderRadius: "4px",
                            }}
                          />
                        ) : (
                          "Subir comprobante de pago"
                        )}
                      </MKButton>
                    </label>
                  </MKBox>
                </MKBox>
              </MKBox>
            )}

            {activeTab === 2 && (
              <MKBox>
                {/* Datos de Contacto */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="Nombre del Encargado"
                      name="client"
                      value={formValues.client}
                      onChange={handleInputChange}
                      sx={{ mb: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Número telefónico"
                      name="phoneNumber"
                      value={formValues.phoneNumber}
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Número telefónico adicional"
                      name="additionalPhoneNumber"
                      value={formValues.additionalPhoneNumber}
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
                <Box
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={termsAccepted}
                        onChange={handleCheckboxChange}
                        color="secondary"
                        sx={{
                          transform: "scale(1.5)", // Aumenta el tamaño del checkbox
                          color: "#007A32", // Cambia el color del checkbox
                        }}
                      />
                    }
                    label={
                      <Box
                        sx={{
                          backgroundColor: "#e0f2f1", // Fondo para destacar el área
                          border: "1px solid #007A32", // Borde que combina con el color del checkbox
                          padding: 2,
                          borderRadius: "8px",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Button
                          color="primary"
                          onClick={handleOpenModal}
                          sx={{ fontWeight: "bold" }}
                        >
                          Acepto los Términos y Condiciones
                        </Button>
                      </Box>
                    }
                  />
                </Box>

                <Modal
                  open={openModal}
                  onClose={handleCloseModal}
                  aria-labelledby="terms-modal-title"
                >
                  <MKBox
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "80%",
                      maxWidth: "900px",
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      p: 4,
                      overflow: "hidden",
                      maxHeight: "95vh",
                    }}
                  >
                    <MKTypography id="terms-modal-title" variant="h6" component="h2" mb={2}>
                      Términos y Condiciones
                    </MKTypography>

                    {/* Contenedor del PDF */}
                    <iframe
                      src={terminosPDF}
                      title="Términos y Condiciones"
                      width="100%"
                      height="500px"
                      style={{ border: "none" }}
                    />

                    <MKBox textAlign="center" mt={3}>
                      <Button variant="contained" color="warning" onClick={handleCloseModal}>
                        Cerrar
                      </Button>
                    </MKBox>
                  </MKBox>
                </Modal>
              </MKBox>
            )}
          </MKBox>

          <MKBox mt={4} display="flex" justifyContent="space-between">
            <MKButton
              variant="contained"
              startIcon={<Icon>arrow_back</Icon>}
              color="info"
              onClick={handleBack}
              disabled={activeTab === 0}
            >
              Anterior
            </MKButton>
            {activeTab < 2 ? (
              <MKButton variant="contained" color="info" onClick={handleNext}>
                Siguiente <Icon style={{ marginLeft: 8 }}>arrow_forward</Icon>
              </MKButton>
            ) : (
              <MKButton
                startIcon={<Icon>send</Icon>}
                variant="contained"
                color="success"
                onClick={handleFinish_Temp}
                disabled={!termsAccepted}
              >
                Finalizar
              </MKButton>
            )}
          </MKBox>
        </>
      )}
    </Card>
  );
}

export default CreateRequestForm;
